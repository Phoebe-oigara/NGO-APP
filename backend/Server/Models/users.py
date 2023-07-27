from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from sqlalchemy.orm import validates
from app import db 
import bcrypt
import re

class Users(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(70), unique=True, nullable=False)
    password = db.Column(db.String, unique=True, nullable=False)
    created_at = db.Column(db.DateTime,server_default=db.func.now() )

    

    @validates('fullname')
    def validate_username(self, key, name):
        assert len(name) >= 8, "name must be at least 8 characters long."
        return name

    @validates('email')
    def validate_email(self, key, email):
            assert '@' in email, "Email address must contain the @ symbol."
            assert '.' in email.split('@')[-1], "Email address must have a valid domain name."
            return email
    
    @validates('password')
    def validate_password(self, key, password):
        assert len(password) >= 8, "Password must be at least 8 characters long."
        assert any(char.isupper() for char in password), "Password must contain at least one capital letter."
        assert any(char.isdigit() for char in password), "Password must contain at least one number."
        assert re.search(r'[!@#$%^&*()-_=+{};:,<.>]', password), "Password must contain at least one symbol."
        return self.hash_password(password)

    def hash_password(self, password):
        # Hash the password using bcrypt
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
        return hashed_password.decode('utf-8')
    
    def __repr__(self):
        return f"User(id={self.id}, username='{self.name}', email='{self.email}', phone = {self.password})"