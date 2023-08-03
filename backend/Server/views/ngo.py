from flask_restful import Resource
from flask import request
from Server.Models.Ngotb import NGO
from app import db
from flask_restful import reqparse
from flask_jwt_extended import jwt_required

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
    @jwt_required()
    def post (self):

        data = request.json

        name = data.get('name')
        description = data.get('description')
        category = data.get('category')
        image = data.get('image')
        email = data.get('email')
        location = data.get('location')
        url = data.get('url')

        new_ngo = NGO(
            name=name,
            description=description,
            category=category,
            image=image,
            email=email,
            location=location,
            url=url
        )

        db.session.add(new_ngo)
        db.session.commit()

        return {"message": "NGO registered successfully."}, 201


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

