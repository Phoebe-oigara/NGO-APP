from flask_sqlalchemy import SQLAlchemy
from app import db
from sqlalchemy import LargeBinary

class Successes(db.Model):
    __tablename__ = "successes"

    id = db.Column(db.Integer, primary_key=True)
    ngotb_id = db.Column(db.Integer, db.ForeignKey('ngotb.id'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    image = db.Column(db.LargeBinary, nullable=True)
    description = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f"Successes(id={self.id}, title='{self.title}', ngotb_id={self.ngotb_id})"