from flask import Blueprint
from flask_restful import Api
# import all views file here

api_endpoints = Blueprint('auth', __name__, url_prefix='/ngoconnect')
api = Api(api_endpoints)

# specify all view points here



