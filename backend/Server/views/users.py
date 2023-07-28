from flask_restful import Resource
from Server.Models.users import Users
from flask import request
from app import db


# api request for customers

class GetAllUsers(Resource):
    def get(self):
        users = Users.query.all()
        users_list = [{
            "id": user.id,
            "fullname": user.fullname,
            "email": user.email,
            "password": user.password
        } for user in users]

        return {'Users': users_list}, 200
    
class AddUser(Resource):
    def post(self):
        data = request.get_json()
        fullname = data.get('fullname')
        email = data.get('email')
        password = data.get('password')

        if not fullname or not email or not password:
            return {'error': 'Invalid name,email or Password.'}, 400

        new_user = Users(fullname=fullname, email=email, password=password)
        db.session.add(new_user)
        db.session.commit()
        
        return {'message': 'New user created successfully'}, 201
    
class UserResourcesById(Resource):
    def get(self, user_id):
        user = Users.query.get(user_id)
        if user:
            return {
                "id": user.id,
                "fullname": user.fullname,
                "email": user.email,
                "password": user.password
            }, 200
        else:
            return {"error": "User not found"}, 404
        
    def patch(self, user_id):
        user = Users.query.get(user_id)
        if not user:
            return {'message': 'User not found'}, 404

        data = request.get_json()
        fullname = data.get('fullname')
        email = data.get('email')

        if fullname:
            user.fullname = fullname
        if email:
            user.email = email

        db.session.commit()

        return {'message': 'User updated successfully'}, 200
        

    def delete(self, user_id):
        user = Users.query.get(user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return {"message": "User deleted successfully"}, 200
        else:
            return {"error": "User not found"}, 404
        
