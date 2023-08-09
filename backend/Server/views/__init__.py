from flask import Blueprint
from flask_restful import Api


from Server.views.ngo import ViewAllNgo,ViewNgoById,RegisterNgo
from Server.views.users import GetAllUsers,AddUser,UserResourcesById,UserLogin, RoleResource
from Server.views.reviews import GetAllReviews,ReviewsResource,AddReview
from Server.views.voluteer import AllVolunteers,AddVolunteers,VolunteerResource
from Server.views.donatios import AccessToken, DonationResource,DonationsResource, InitiateSTK,LineChartResource, MakeB2CPayment, RegisterURLs, SimulatePayment
from Server.views.success import SuccessesResource,SuccessesListResource






api_endpoints = Blueprint('auth', __name__, url_prefix='/ngoconnect')
api = Api(api_endpoints)


api.add_resource(ViewAllNgo, '/ngolist')
api.add_resource(RegisterNgo, '/register')
api.add_resource(ViewNgoById, '/ngo/<int:ngo_id>')


api.add_resource(GetAllUsers, '/users')
api.add_resource(UserLogin,'/login')
api.add_resource(AddUser, '/addusers')
api.add_resource(UserResourcesById, '/users/<int:user_id>')
api.add_resource(RoleResource, '/roles', '/roles/<int:role_id>')

api.add_resource(GetAllReviews, '/reviews')
api.add_resource(AddReview,'/addreview')
api.add_resource(ReviewsResource,'/review/<int:review_id>')


api.add_resource(AllVolunteers, '/volunteers')
api.add_resource(AddVolunteers,'/addvoluteer')
api.add_resource(VolunteerResource, '/volunteers/<int:volunteer_id>')

api.add_resource(DonationResource, '/donations/<int:donation_id>')
api.add_resource(DonationsResource, '/donations')
api.add_resource(LineChartResource, '/line-chart')
api.add_resource(AccessToken, '/access_token')
api.add_resource(RegisterURLs, '/registerd')
api.add_resource(SimulatePayment, '/simulate')
api.add_resource(MakeB2CPayment, '/b2c')
api.add_resource(InitiateSTK, '/lnmo')

api.add_resource(SuccessesResource, '/successes/<int:success_id>')
api.add_resource(SuccessesListResource, '/successes')
