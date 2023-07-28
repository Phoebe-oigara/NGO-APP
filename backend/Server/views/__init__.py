from flask import Blueprint
from flask_restful import Api
# import all views file here
from Server.views.ngoviews import ViewAllNgo,ViewNgoById,RegisterNgo
from Server.views.users import GetAllUsers,AddUser,UserResourcesById


api_endpoints = Blueprint('auth', __name__, url_prefix='/ngoconnect')
api = Api(api_endpoints)

# specify all view points here
api.add_resource(ViewAllNgo, '/ngolist')
api.add_resource(RegisterNgo, '/register')
api.add_resource(ViewNgoById, '/ngo/<int:ngo_id>')

api.add_resource(GetAllUsers, '/users')
api.add_resource(AddUser, '/users')
api.add_resource(UserResourcesById, '/users/<int:user_id>')