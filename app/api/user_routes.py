from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Listing, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

# Get all listings of a user
@user_routes.route('/<int:id>/listings')
@login_required
def get_user_listings(id):
    # user_id = current_user.id
    user_listings = Listing.query.filter(Listing.user_id == id)
    listings = {}
    for listing in user_listings:
        obj = listing.to_dict()
        listings[obj["id"]] = obj
    return listings, 200
