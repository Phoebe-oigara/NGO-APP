import os
from flask import Flask
from config import app_config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
app = Flask(__name__)


def initializing_models():
    from Server.Models.donations import Donations
    from Server.Models.Ngotb import NGO
    from Server.views.reviews import Reviews
    from Server.Models.successtb import Successes
    from Server.Models.users import Users
    from Server.Models.Volunteers import Volunteers

    

def initializing_views():
    from Server.views import api_endpoints
    app.register_blueprint(api_endpoints)


def create_app(config_name):

    app.config.from_object(config_name)

    app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///app.db'
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Initialize the db with the app
    db.init_app(app)

    migrate = Migrate(app, db)


    with app.app_context():
        # Initialize models within the application context
        initializing_models()

    # Create the database tables (if they don't exist)
        db.create_all()


    # initializing the endpoints
    initializing_views()

    return app






