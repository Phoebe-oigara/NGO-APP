from flask_restful import Resource,abort
from Server.Models.successtb import Successes
from flask import request
from app import db


def get_successes_instance(success_id):
    instance = Successes.query.get(success_id)
    if not instance:
        abort(404, message="Successes instance not found.")
    return instance

# Resource for single Successes instance
class SuccessesResource(Resource):
    def get(self, success_id):
        instance = get_successes_instance(success_id)
        return {'id': instance.id, 'title': instance.title, 'description': instance.description}

    def put(self, success_id):
        instance = get_successes_instance(success_id)
        data = request.get_json()
        instance.title = data['title']
        instance.description = data['description']
        db.session.commit()
        return {'message': 'Successes instance updated successfully.'}

    def delete(self, success_id):
        instance = get_successes_instance(success_id)
        db.session.delete(instance)
        db.session.commit()
        return {'message': 'Successes instance deleted successfully.'}

# Resource for listing all Successes instances and creating new instances
class SuccessesListResource(Resource):
    def get(self):
        instances = Successes.query.all()
        return [{'id': instance.id, 'title': instance.title} for instance in instances]

    def post(self):
        data = request.get_json()
        title = data['title']
        description = data['description']
        # Add other required fields based on your use case

        new_instance = Successes(title=title, description=description)
        db.session.add(new_instance)
        db.session.commit()
        return {'message': 'Successes instance created successfully.', 'id': new_instance.id}, 201