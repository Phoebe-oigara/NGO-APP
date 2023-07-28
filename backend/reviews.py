from flask_restful import Resource, reqparse
from app import db
from models import Reviews

class GetAllReviews(Resource):
    def get(self):
        reviews = Reviews.query.all()
        reviews_list = [{
            "id": review.id,
            "user_id": review.user_id,
            "ngotb_id": review.ngotb_id,
            "review": review.review
        } for review in reviews]

        return {'reviews': reviews_list}, 200

class ReviewsResource(Resource):
    def get(self, review_id):
        review = Reviews.query.get(review_id)
        if review:
            return {
                "id": review.id,
                "user_id": review.user_id,
                "ngotb_id": review.ngotb_id,
                "review": review.review
            }, 200
        else:
            return {"error": "Review not found"}, 404

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('user_id', type=int, required=True, help="User ID is required.")
        parser.add_argument('ngotb_id', type=int, required=True, help="NGO ID is required.")
        parser.add_argument('review', type=str, required=True, help="Review is required.")
        data = parser.parse_args()

        review = Reviews(
            user_id=data['user_id'],
            ngotb_id=data['ngotb_id'],
            review=data['review']
        )
        db.session.add(review)
        db.session.commit()

        return {'message': 'Review added successfully'}, 201

    def patch(self, review_id):
        review = Reviews.query.get(review_id)
        if not review:
            return {"error": "Review not found"}, 404

        parser = reqparse.RequestParser()
        parser.add_argument('review', type=str, required=True, help="Review is required.")
        data = parser.parse_args()

        review.review = data['review']
        db.session.commit()

        return {'message': 'Review updated successfully'}, 200

    def delete(self, review_id):
        review = Reviews.query.get(review_id)
        if not review:
            return {"error": "Review not found"}, 404

        db.session.delete(review)
        db.session.commit()

        return {'message': 'Review deleted successfully'}, 200
