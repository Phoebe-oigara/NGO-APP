from flask_restful import Resource,abort,reqparse
from Server.Models.donations import Donations
from flask import request
from app import db



class DonationResource(Resource):
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
            'donation_date': donation.donation_date,
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
                'donation_date': donation.donation_date,
            } for donation in donations
        ], 200

    def post(self):
        try:
            # Parse the request data and create a new Donation
            parser = reqparse.RequestParser()
            parser.add_argument('user_id', type=int, required=True)
            parser.add_argument('ngotb_id', type=int, required=True)
            parser.add_argument('phone_number', type=str, required=True, help="Phone number must be a 10-digit number.")
            parser.add_argument('amount', type=int, required=True, help="Amount must be an integer.")
            data = parser.parse_args()

            donation = Donations(**data)
            db.session.add(donation)
            db.session.commit()

            return {'message': 'Donation created successfully.'}, 201
        except ValueError as e:
            # If phone number or amount is invalid, return a 400 Bad Request error
            abort(400, message=str(e))
        except Exception as e:
            # Handle other errors (e.g., database errors) with a 500 Internal Server Error
            abort(500)