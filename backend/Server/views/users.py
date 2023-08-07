from flask_restful import Resource
import jwt
from Server.Models.users import Users
from flask_jwt_extended import create_access_token, jwt_required,current_user,JWTManager,get_jwt_identity
from flask import jsonify, request
from app import db,jwt



@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id



@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return Users.query.filter_by(id=identity).one_or_none()

# api request for users

class GetAllUsers(Resource):
    @jwt_required()
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
    @jwt_required()
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
  

    

class UserLogin(Resource):
    def post(self):
        
            email = request.json.get("email", None)
            password = request.json.get("password", None)

            user = Users.query.filter_by(email=email).one_or_none()
            if not user or not user.hash_password(password):
                return jsonify("Wrong email or password"), 401

            # Notice that we are passing in the actual sqlalchemy user object here
            access_token = create_access_token(identity=user)
            return jsonify(access_token=access_token)

        

class UserResourcesById(Resource):
    @jwt_required()
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
        