from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from sqlalchemy.orm import validates
import re
from app import db 


class Reviews(db.Model):
    __tablename__="reviews"

    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    ngotb_Id = db.Column(db.Integer, db.ForeignKey('ngotb.id'))
    review = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        
        return f"Review(id={self.id}, user_id={self.user_id}, ngotb_id={self.ngotb_id}, review='{self.review}')"