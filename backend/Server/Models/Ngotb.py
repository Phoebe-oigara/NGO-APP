from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from sqlalchemy.orm import validates
from urllib.parse import urlparse

import re
from app import db 


class NGO(db.Model):
    __tablename__= "ngotb"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(255), nullable=False)
    image = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(70), unique=True, nullable=False)
    Location = db.Column(db.String(255), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())


    donations = db.relationship('Donations', backref='ngotb', lazy=True)

    


    @validates('name')
    def validate_username(self, key, name):
        assert len(name) >= 8, "name must be at least 8 characters long."
        return name


    @validates('email')
    def validate_email(self, key, email):
            assert '@' in email, "Email address must contain the @ symbol."
            assert '.' in email.split('@')[-1], "Email address must have a valid domain name."
            return email
    
    
    @validates('url')
    def validate_url(self, key, url):
        parsed_url = urlparse(url)
        if not all([parsed_url.scheme, parsed_url.netloc]):
            raise AssertionError("Invalid URL. Please provide a valid URL with a scheme (e.g., http, https) and netloc.")
        return url
    
    def __repr__(self):
        return (
            f"NGO(id={self.id}, name='{self.name}' "
            f"description='{self.description}', category='{self.category}', "
            f"image={self.image}, email='{self.email}', Location='{self.Location}', "
            f"url='{self.url}', created_at='{self.created_at}')"
        )
