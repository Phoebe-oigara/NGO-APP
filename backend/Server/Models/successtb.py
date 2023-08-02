from flask_sqlalchemy import SQLAlchemy
from app import db


class Successes(db.Model):
    __tablename__ = "successes"

    id = db.Column(db.Integer, primary_key=True)
    ngotb_id = db.Column(db.Integer, db.ForeignKey('ngotb.id'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String, nullable=True)
    description = db.Column(db.Text, nullable=False)

    ngotb_id = db.Column(db.Integer, db.ForeignKey('ngotb.id'), nullable=False)
    
    ngotb = db.relationship('NGO', backref='successes', lazy=True)

    def __repr__(self):# rep obj as a string when printed
        return f"Successes(id={self.id}, title='{self.title}', ngotb_id={self.ngotb_id})"