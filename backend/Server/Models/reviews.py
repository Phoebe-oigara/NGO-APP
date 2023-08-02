from flask_sqlalchemy import SQLAlchemy#flask extension that supports SQLALCHEMY
from sqlalchemy import func #invoke SQL functions in SQLAlchemy queries
from sqlalchemy.orm import validates # The validates decorator is part of SQLAlchemy's Object-Relational Mapping (ORM) functionality, and it allows you to define validation functions for the columns of a SQLAlchemy model.
import re #imports regular expression module,for pattern matching
from app import db 


class Reviews(db.Model):#base class provided by the SQLalchemy
    __tablename__="reviews"# name of db table 

    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    ngotb_id = db.Column(db.Integer, db.ForeignKey('ngotb.id'))
    review = db.Column(db.String(255), nullable=False)

    def __repr__(self):#rep the obj as string when printed
        
        return f"Review(id={self.id}, user_id={self.user_id}, ngotb_id={self.ngotb_id}, review='{self.review}')"#rep a string representation of the 'Review obj'