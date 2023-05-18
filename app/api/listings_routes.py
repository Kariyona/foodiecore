from flask import Blueprint
from app.models import Listing, db
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages

# Create Blueprint for listings routes
listings_routes = Blueprint('/listings', __name__)

@listings_routes.route('')
@login_required
def get_listings():
    listings = Listing.query.all()
    print(listings)
