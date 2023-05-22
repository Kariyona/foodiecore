from flask import Blueprint, request
from app.models import User, Listing, db
from flask_login import login_required, current_user

profile_routes = Blueprint('profile', __name__)

@profile_routes.route('')
def get_profile():
    if current_user.is_authenticated:
        username = current_user.username
        return username
    else:
        return {'errors': ['User is not logged in']}, 401
