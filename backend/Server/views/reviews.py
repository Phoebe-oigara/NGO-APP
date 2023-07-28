from flask_restful import Resource
from Server.Models.reviews import Reviews
from flask import request
from app import db


class GetReviews(Resource):
    def get(self):
        reviews = Reviews.query.all()
        reviews_list = [{
            'id': reviews.id,
            'user_id': reviews.user_id,
            'ngotb_id': reviews.ngotb_Id,
            'review': reviews.review
        } for review in reviews]

        return {'reviews': reviews_list}, 200
    
class AddReview(Resource):
    def post(self):
        data = request.get_json()
        user_id = data.get('user_id')
        ngotb_id = data.get('ngotb_id')
        review = data.get('review')

        if 'user_id' not in data or 'ngotb_id' not in data or 'review' not in data:
            return ('Missing required fields in the request.'), 400
        new_review = Reviews(user_id=user_id, ngotb_Id=ngotb_id, review=review)
      
        db.session.add(new_review)
        db.session.commit()
        
        return {'message': 'New user created successfully'}, 201