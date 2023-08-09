import os
from flask import Flask
from config import app_config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager



db = SQLAlchemy()



app = Flask(__name__)

base_url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
consumer_key = 'DhKAsjKafEfTtnQtOk3h4muZPqjNeY2h'
consumer_secret = 'ktfcYuFVzzyPMlBL'


jwt = JWTManager()



def initializing_models():
    from Server.Models.donations import Donations
    from Server.Models.Ngotb import NGO
    from Server.views.reviews import Reviews
    from Server.Models.successtb import Successes
    from Server.Models.users import Users,Role,UserRole
    from Server.Models.Volunteers import Volunteers

    

def initializing_views():
    from Server.views import api_endpoints
    app.register_blueprint(api_endpoints)


def create_app(config_name):

    app.config.from_object(config_name)
    app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///app.db'
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config['JWT_SECRET_KEY'] = 'Soweto@awsum2023'
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 3600
    
    
    

    # Initialize the db with the app
    db.init_app(app)
    jwt.init_app(app)
    

   
    migrate = Migrate(app, db)

    with app.app_context():
        # Initialize models within the application context
        initializing_models()

        # Create the database tables (if they don't exist)
        db.create_all()

    # initializing the endpoints
    initializing_views()

    return app






