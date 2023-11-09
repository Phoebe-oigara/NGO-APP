import re
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from flask import request
from Server.Models.Ngotb import NGO
from app import db
from flask_restful import reqparse
from flask_jwt_extended import jwt_required, current_user


class CountNgo(Resource):
    def get(self):
        ngo_count = NGO.query.count()
        return {"ngo_count": ngo_count}, 200

class  ViewAllNgo(Resource):
    @jwt_required()
    def get(self):
        ngo = NGO.query.all()

        ngo_list = [{
            "id": ngo.id,
            "name": ngo.name,
            "description":ngo.description,
            "category":ngo.category,
            "image":ngo.image,
            "email":ngo.email,
            "location":ngo.location,
            "url":ngo.url
        } for ngo in ngo ]

        return {'All_ngos': ngo_list},200
        

class RegisterNgo(Resource):
    
    def post (self):

        data = request.json

        print("Received data:", data)
        name = data.get('name')
        description = data.get('description')
        category = data.get('category')
        image_public_id = data.get('image')
        email = data.get('email')
        location = data.get('location')
        url = data.get('url')

        existing_ngo = NGO.query.filter_by(email=email).first()

        if existing_ngo:
            return {"message": "The provided email is already registered."}, 400 

        new_ngo = NGO(
            name=name,
            description=description,
            category=category,
            image=image_public_id,
            email=email,
            location=location,
            url=url
        )
        try:
            db.session.add(new_ngo)
            db.session.commit()
            print("NGO registered successfully")
        except Exception as e:
            db.session.rollback()
            print("Error while registering NGO:", e)

        return {"message": "NGO registered successfully and user status updated to admin."}, 201



class ViewNgoById(Resource):
    @jwt_required()
    def get (self, ngo_id):
        ngo = NGO.query.get(ngo_id)

        if ngo:
            ngo_data = {
                "id": ngo.id,
                "name": ngo.name,
                "description": ngo.description,
                "category": ngo.category,
                "image": ngo.image,
                "email": ngo.email,
                "location": ngo.location,
                "url": ngo.url
            }
            return ngo_data, 200
        else:
            return {"message": "NGO not found"}, 404


    def delete(self, ngo_id):
        ngo = NGO.query.get(ngo_id)

        if ngo:
            db.session.delete(ngo)
            db.session.commit()
            return {"message": "NGO deleted successfully"}, 200
        else:
            return {"message": "NGO not found"}, 404

    def patch(self, ngo_id):
        # Retrieve the NGO with the given ID from the database
        ngo = NGO.query.get(ngo_id)

        if not ngo:
            return {"message": "NGO not found"}, 404

        parser = reqparse.RequestParser()
        parser.add_argument("name", type=str, required=False)
        parser.add_argument("description", type=str, required=False)
        parser.add_argument("category", type=str, required=False)
        parser.add_argument("image", type=str, required=False)
        parser.add_argument("email", type=str, required=False)
        parser.add_argument("location", type=str, required=False)
        parser.add_argument("url", type=str, required=False)
        data = parser.parse_args()

        # Update only the provided fields
        for key, value in data.items():
            if value is not None:
                setattr(ngo, key, value)

        db.session.commit()

        return {"message": "NGO updated successfully", "ngo": ngo.__repr__()}, 200
