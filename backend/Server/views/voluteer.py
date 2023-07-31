from flask_restful import Resource,abort
from Server.Models.Volunteers import Volunteers
from flask import request
from app import db
from datetime import datetime


class VolunteerResource(Resource):
    def get(self, volunteer_id):
        # Get a specific volunteer by their ID
        volunteer = Volunteers.query.get(volunteer_id)
        if volunteer is None:
            abort(404, message="Volunteer not found.")
        
        return { 
            'id': volunteer.id,
            'ngotb_id': volunteer.ngotb_id,
            'description': volunteer.description,
            'role': volunteer.role,
            'created_at': volunteer.created_at.isoformat()
        }, 200

    def put(self, volunteer_id):
        # Update a specific volunteer by their ID
        volunteer = Volunteers.query.get(volunteer_id)
        if volunteer is None:
            abort(404, message="Volunteer not found.")

        data = request.get_json()
        volunteer.ngotb_id = data.get('ngotb_id', volunteer.ngotb_id)
        volunteer.description = data.get('description', volunteer.description)
        volunteer.role = data.get('role', volunteer.role)

        db.session.commit()

        return {'message': 'Volunteer updated successfully.'}, 200

    def delete(self, volunteer_id):
        # Delete a specific volunteer by their ID
        volunteer = Volunteers.query.get(volunteer_id)
        if volunteer is None:
            abort(404, message="Volunteer not found.")

        db.session.delete(volunteer)
        db.session.commit()

        return {'message': 'Volunteer deleted successfully.'}, 200

# Resource for handling multiple Volunteers
class AllVolunteers(Resource):
    def get(self):
        # Get all volunteers
        volunteers = Volunteers.query.all()
        return [
            {
                'id': volunteer.id,
                'ngotb_id': volunteer.ngotb_id,
                'description': volunteer.description,
                'role': volunteer.role,
                'created_at': volunteer.created_at,
            } for volunteer in volunteers
        ], 200


class  AddVolunteers(Resource):
    def post(self):
        try:
            # Parse the request data and create a new Volunteer
            data = request.get_json()
            volunteer = Volunteers(**data)
            db.session.add(volunteer)
            db.session.commit()

            return {'message': 'Volunteer created successfully.'}, 201
        except KeyError as e:
            # If required fields are missing, return a 400 Bad Request error
            abort(400, message=f"Missing required field: {str(e)}")
        except Exception as e:
            # Handle other errors (e.g., database errors) with a 500 Internal Server Error
            abort(500)