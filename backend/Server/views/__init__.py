from flask import Blueprint
from flask_restful import Api
from Server.views.users import GetAllUsers,AddUser,UserResourcesById


# import all views file here

api_endpoints = Blueprint('auth', __name__, url_prefix='/ngoconnect')
api = Api(api_endpoints)

# specify all view points here

api.add_resource(GetAllUsers, '/users')
api.add_resource(AddUser, '/users')
api.add_resource(UserResourcesById, '/users/<int:user_id>')






