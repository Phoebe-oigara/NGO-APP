from flask_restful import Resource
import jwt
from Server.Models.users import Role, Users
from flask_jwt_extended import create_access_token, jwt_required,get_current_user
from flask import jsonify, request,make_response
from app import db,jwt
from functools import wraps


def auth_role(role):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            current_user = get_current_user()
            roles = role if isinstance(role, list) else [role]
            if all(not current_user.has_role(r) for r in roles):
                return make_response({"msg": f"Missing any of roles {','.join(roles)}"}, 403)
            return fn(*args, **kwargs)

        return decorator

    return wrapper


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
    def post(self):
        data = request.get_json()
        print("Received data:", data)
        fullname = data.get('fullname')
        email = data.get('email')
        password = data.get('password')
        roles = data.get('roles', ['user'])
     

        if not fullname or not email or not password:
            return {'error': 'Invalid name,email or Password.'}, 400

        new_user = Users(fullname=fullname, email=email, password=password)
        new_user.assign_ngo_admin_role()
        print("Roles before assignment:", new_user.roles)



    
   

class UserLogin(Resource):
    def post(self):
        
            email = request.json.get("email", None)
            password = request.json.get("password", None)

            user = Users.query.filter_by(email=email).one_or_none()
            if not user or not user.hash_password(password):
                return jsonify("Wrong email or password"), 401

            # Notice that we are passing in the actual sqlalchemy user object here
            access_token = create_access_token(identity=user, additional_claims={'roles': [role.slug for role in user.roles]})
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

    


class RoleResource(Resource):
    def get(self, role_id=None):
        if role_id is None:
            roles = Role.query.all()
            roles_list = [{
                "id": role.id,
                "name": role.name,
                "slug": role.slug
            } for role in roles]

            return {'Roles': roles_list}, 200

        role = Role.query.get(role_id)
        if role:
            return {
                "id": role.id,
                "name": role.name,
                "slug": role.slug
            }, 200
        else:
            return {"error": "Role not found"}, 404

    def post(self):
        data = request.get_json()
        name = data.get('name')
        slug = data.get('slug')

        if not name or not slug:
            return {'error': 'Invalid name or slug for the role.'}, 400

        new_role = Role(name=name, slug=slug)
        db.session.add(new_role)
        db.session.commit()

        return {'message': 'New role created successfully'}, 201

    def patch(self, role_id):
        role = Role.query.get(role_id)
        if not role:
            return {'message': 'Role not found'}, 404

        data = request.get_json()
        name = data.get('name')
        slug = data.get('slug')

        if name:
            role.name = name
        if slug:
            role.slug = slug

        db.session.commit()

        return {'message': 'Role updated successfully'}, 200

    def delete(self, role_id):
        role = Role.query.get(role_id)
        if role:
            db.session.delete(role)
            db.session.commit()
            return {"message": "Role deleted successfully"}, 200
        else:
            return {"error": "Role not found"}, 404