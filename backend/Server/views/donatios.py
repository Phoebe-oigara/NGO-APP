from flask_restful import Resource,abort,reqparse
from Server.Models.donations import Donations
from Server.Models.users import Users
from Server.Models.Ngotb import NGO
from flask_jwt_extended import  jwt_required
from flask import request, jsonify
from app import db,consumer_key,consumer_secret,base_url
from sqlalchemy import func
from requests.auth import HTTPBasicAuth
import requests
import base64
from datetime import datetime


class DonationResource(Resource):
    @jwt_required()
    def get(self, donation_id):
        # Get a specific donation by its ID
        donation = Donations.query.get(donation_id)
        if donation is None:
            abort(404, message="Donation not found.")

        return {
            'id': donation.id,
            'user_id': donation.user_id,
            'ngotb_id': donation.ngotb_id,
            'phone_number': donation.phone_number,
            'amount': donation.amount,
            'donation_date': donation.donation_date.strftime('%Y-%m-%dT%H:%M:%S')
        }, 200

    def put(self, donation_id):
        # Update a specific donation by its ID
        donation = Donations.query.get(donation_id)
        if donation is None:
            abort(404, message="Donation not found.")

        parser = reqparse.RequestParser()
        parser.add_argument('phone_number', type=str, required=True, help="Phone number must be a 10-digit number.")
        parser.add_argument('amount', type=int, required=True, help="Amount must be an integer.")
        data = parser.parse_args()

        donation.phone_number = data['phone_number']
        donation.amount = data['amount']

        db.session.commit()

        return {'message': 'Donation updated successfully.'}, 200

    def delete(self, donation_id):
        # Delete a specific donation by its ID
        donation = Donations.query.get(donation_id)
        if donation is None:
            abort(404, message="Donation not found.")

        db.session.delete(donation)
        db.session.commit()

        return {'message': 'Donation deleted successfully.'}, 200

# Resource for handling multiple Donations
class DonationsResource(Resource):
    @jwt_required()
    def get(self):
        # Get all donations
        donations = Donations.query.all()
        return [
            {
                'id': donation.id,
                'user_id': donation.user_id,
                'ngotb_id': donation.ngotb_id,
                'phone_number': donation.phone_number,
                'amount': donation.amount,
                'donation_date': donation.donation_date.strftime('%Y-%m-%dT%H:%M:%S')
            } for donation in donations
        ], 200

    def post(self):
        try:

            parser = reqparse.RequestParser()
            parser.add_argument('donorName', type=str, required=True)
            parser.add_argument('organization', type=str, required=True)
            parser.add_argument('phone_number', type=str, required=True, help="Phone number must be a 10-digit number.")
            parser.add_argument('amount', type=int, required=True, help="Amount must be an integer.")
            data = parser.parse_args()

            # Retrieve user_id based on donor's name
            user = Users.query.filter_by(fullname=data['donorName']).first()
            if user is None:
            
                return {'message': 'Donor not found'}, 400
            
            # Retrieve ngotb_id based on organization name
            organization = NGO.query.filter_by(name=data['organization']).first()
            if organization is None:
            
                return {'message': 'Organization not found'}, 400

            # Create and save the donation with correct foreign keys
            donation = Donations(
                user_id=user.id,
                ngotb_id=organization.id,
                phone_number=data['phone_number'],
                amount=data['amount']
        )
            db.session.add(donation)
            db.session.commit()

            return {'message': 'Donation created successfully.'}, 201
        except ValueError as e:
            # If phone number or amount is invalid, return a 400 Bad Request error
            abort(400, message=str(e))
        except Exception as e:
            # Handle other errors (e.g., database errors) with a 500 Internal Server Error
            print("Exception:", e)
            abort(500)

class LineChartResource(Resource):
        def get(self):
            # Query the database to fetch donation data
            donations_data = db.session.query(Donations.donation_date, func.sum(Donations.amount)).group_by(Donations.donation_date).all()

            # Process the data to extract dates and amounts for the chart
            labels = [str(date) for date, _ in donations_data]
            amounts = [amount for _, amount in donations_data]

            # Prepare the chart data
            chart_data = {
                'labels': labels,
                'datasets': [
                    {
                        'label': 'Donation Amount',
                        'data': amounts,
                        'borderColor': 'rgb(255, 99, 132)',
                        'backgroundColor': 'rgba(255, 99, 132, 0.5)',
                    }
                ],
            }

            return jsonify(chart_data)

# ... (Previous code remains the same)
class AccessToken(Resource):
    def get(self):
        return self._access_token()

    @staticmethod
    def _access_token():
        endpoint = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
        r = requests.get(endpoint, auth=HTTPBasicAuth(consumer_key, consumer_secret))
        data = r.json()
        return data['access_token']

class RegisterURLs(Resource):
    def get(self):
        access_token = AccessToken._access_token()
        my_endpoint = base_url + "c2b/"
        headers = {"Authorization": "Bearer %s" % access_token}
        r_data = {
            # "ShortCode": "600383",
            "ResponseType": "Completed",
            "ConfirmationURL": my_endpoint + 'con',
            "ValidationURL": my_endpoint + 'val'
        }
        
        endpoint = 'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl'

        response = requests.post(endpoint, json=r_data, headers=headers)
        return response.json()

class SimulatePayment(Resource):
    def get(self):
        access_token = AccessToken._access_token()
        headers = {"Authorization": "Bearer %s" % access_token}
        endpoint = 'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate'
        data_s = {
            "Amount": 100,
            # "ShortCode": "600383",
            "BillRefNumber": "test",
            "CommandID": "CustomerPayBillOnline",
            "Msisdn": "254748003189"
        }
        res = requests.post(endpoint, json=data_s, headers=headers)
        return res.json()


class MakeB2CPayment(Resource):
    def get(self):
        access_token = AccessToken._access_token()
        headers = {"Authorization": "Bearer %s" % access_token}
        endpoint = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
        my_endpoint = base_url + "/b2c/"
        data = {
            "InitiatorName": "apitest342",
            "SecurityCredential": "HohhqI2NsSrioX1z0THsOEaf1Ddpjh7oBmJi/U5ayOEOtJqnqCmc5pO8GWMXYg8ADlTiCCk/iWZIjpp81bOsb6R27Djy11Y5pqyMMVp8P0jVBCV0wLV3OmeYvGH3FlVhuSDSg48jjS8ekGqTGb1Fw1HS2rTl7iq2su06FQu10H27sIh+iOSBKpLD2mgDKJOpwzKTmvvk2fKB/r6fqL/ibig4HzsVFmpNm06AUPmR5t67EIduM73j3LhrltjRyOWowcEAlcOTwSkzMdGxnIKR26aBdRv8frIdiZr1LCo8enOC7+aj+qhDvRzqpaTpLugbNik5co5wIWmqXVbpqjJohg==",
            "CommandID": "BusinessPayment",
            "Amount": "200",
            "PartyA": "254748003189",
            "PartyB": "254748003189",
            "Remarks": "Pay Salary",
            "QueueTimeOutURL": my_endpoint + "timeout",
            "ResultURL": my_endpoint + "result",
            "Occasion": "Donation"
        }
        res = requests.post(endpoint, json=data, headers=headers)
        return res.json()

class InitiateSTK(Resource):
    def get(self):
        access_token = AccessToken._access_token()
        headers = {"Authorization": "Bearer %s" % access_token}
        endpoint = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
        my_endpoint = base_url + "/lnmo"
        Timestamp = datetime.now()
        times = Timestamp.strftime("%Y%m%d%H%M%S")
        password = "174379" + "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" + times
        datapass = base64.b64encode(password.encode('utf-8'))


        phone_number = request.args.get('phone_number')
        amount = request.args.get('amount')
        
        data = {
            "BusinessShortCode": "174379",
            "Password": datapass.decode('utf-8'),
            "Timestamp": times,
            "TransactionType": "CustomerPayBillOnline",
            "PartyA": "254" + phone_number,
            "PartyB": "174379",
            "PhoneNumber": "254" + phone_number,
            "CallBackURL": my_endpoint,
            "AccountReference": "NGOconnect",
            "TransactionDesc": "Donation",
            "Amount": amount,
        }

        res = requests.post(endpoint, json=data, headers=headers)
        return res.json()

# Create classes for /b2c/result, /b2c/timeout, /c2b/val, and /c2b/con similarly.