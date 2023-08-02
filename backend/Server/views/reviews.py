
#This code defines a set of Flask-RESTful resources to handle CRUD operations for the Reviews model. Each resource corresponds to a specific API endpoint, allowing clients to interact with the Reviews data.
from flask_restful import Resource, reqparse#BASE CLASS FOR RESTFUL RESOURCES,parsing and validation of request data
from app import db
from Server.Models.reviews import Reviews#model class representing the reviews table

class GetAllReviews(Resource):#get request to retrieve all reviews from the database
    def get(self):
        reviews = Reviews.query.all()
        reviews_list = [{#formats data into a list of dictionaries
            "id": review.id,
            "user_id": review.user_id,
            "ngotb_id": review.ngotb_id,
            "review": review.review
        } for review in reviews]

        return {'reviews': reviews_list}, 200#returns format in json with status code 200 meaning successful
    

class AddReview(Resource):#subclass of resource
    
    def post(self):#this method is called when a post request is made to the endpoint
        parser = reqparse.RequestParser()#parse data and validate based on defined arguements
        parser.add_argument('user_id', type=int, required=True, help="User ID is required.")
        parser.add_argument('ngotb_id', type=int, required=True, help="NGO ID is required.")
        parser.add_argument('review', type=str, required=True, help="Review is required.")#provided additional info and error messages if data is missing and incorrect
        data = parser.parse_args()#stores parsed data in this variable

        review = Reviews(#an object is created from the parsed data
            user_id=data['user_id'],
            ngotb_id=data['ngotb_id'],
            review=data['review']
        )
        db.session.add(review)#adds new obj to database
        db.session.commit()

        return {'message': 'Review added successfully'}, 201

class ReviewsResource(Resource):
    def get(self, review_id):
        review = Reviews.query.get(review_id)
        if review:
            return {#JSON RESPONSE
                "id": review.id,
                "user_id": review.user_id,
                "ngotb_id": review.ngotb_id,
                "review": review.review
            }, 200
        else:
            return {"error": "Review not found"}, 404


    def patch(self, review_id):
        review = Reviews.query.get(review_id)
        if not review:
            return {"error": "Review not found"}, 404

        parser = reqparse.RequestParser()#If the review is found, it proceeds to parse the request data
        parser.add_argument('review', type=str, required=True, help="Review is required.")
        data = parser.parse_args()

        review.review = data['review']#updates the review attribute of the review object with the new value from the request data.
        db.session.commit()

        return {'message': 'Review updated successfully'}, 200

    def delete(self, review_id):
        review = Reviews.query.get(review_id)
        if not review:
            return {"error": "Review not found"}, 404

        db.session.delete(review)#DELETE REVIEW FROM DATABASE
        db.session.commit()

        return {'message': 'Review deleted successfully'}, 200
