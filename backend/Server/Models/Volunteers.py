from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from app import db

class Volunteers(db.Model):
    __tablename__ = 'volunteers'

    id = db.Column(db.Integer, primary_key=True)
    ngotb_Id = db.Column(db.Integer, db.ForeignKey('ngotb.id'))  
    description = db.Column(db.Text, nullable=False)  
    role = db.Column(db.String(100), nullable=False)  
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"Volunteer (id={self.id}, ngotb_id={self.ngotb_id}, description={self.description}, role={self.role}, created_at={self.created_at})"