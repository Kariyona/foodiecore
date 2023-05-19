from flask import Blueprint, request
from app.models import Listing, db
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from ..forms.listing_form import ListingForm

# Create Blueprint for listings routes
listings_routes = Blueprint('listings', __name__)

@listings_routes.route('')
@login_required
def get_listings():
    all_listings = Listing.query.all()
    # print(listings)
    listings = {}
    for listing in all_listings:
        obj = listing.to_dict()
        # print(obj)
        listings[obj["id"]] = obj
    return listings, 200

# Get listing by listing id
@listings_routes.route('/<int:listingId>')
@login_required
def get_listing(listingId):
    listing = Listing.query.get(listingId)

    if not listing:
        return {'errors': ['Listing does not exist']}, 404

    return listing.to_dict(), 200

# Create a listing
@listings_routes.route('/new', methods=["POST"])
@login_required
def create_listing():
    form = ListingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        listing = Listing()
        form.populate_obj(listing)

        db.session.add(listing)
        db.session.commit()
        return listing.to_dict()
