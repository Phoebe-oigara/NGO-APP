from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from datetime import datetime
from sqlalchemy.orm import validates

from app import db

class Donations(db.Model):

    __tablename__ = 'donations'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    ngotb_id = db.Column(db.Integer, db.ForeignKey('ngotb.id'))
    phone_number = db.Column(db.Integer, nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    donation_date = db.Column(db.DateTime,server_default=db.func.now() )

    @validates('phone_number')
    def validate_phone_number(self, key, phone_number):
        # Custom validation for phone_number attribute
        if not phone_number or not phone_number.isdigit() or len(phone_number) != 10:
            raise ValueError("Invalid phone number format. Phone number must be a 10-digit number.")
        return phone_number
    


def __repr__(self):
        return f"Transaction(id={self.id}, customer_id={self.user_id}, amount={self.amount}, donation_date={self.transaction_date})"
    