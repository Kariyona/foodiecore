from flask import Blueprint, request
from app.models import Listing, Review, User, db
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from ..forms.listing_form import ListingForm
from ..forms.review_form import ReviewForm

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
    # Creates instance of ListingForm class
    form = ListingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # x = request.get_json()
    # print(x)
    # print(x)
    # print(x)
    # print(x)
    # print(x)
    # print(x)
    # print(x)
    # print(x)
    # print(x)
    if form.validate_on_submit():
        listing = Listing()
        listing.user_id = current_user.id
        # print(listing)
        form.populate_obj(listing)

        db.session.add(listing)
        db.session.commit()
        return listing.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# Delete listing by id


@listings_routes.route('/<int:listingId>/delete', methods=['DELETE'])
@login_required
def delete_listing(listingId):
    listing = Listing.query.get(listingId)

    if not listing:
        return {'errors': ['Listing does not exist']}, 404

    # Check if listing belongs to user
    if listing.user_id == current_user.id:
        db.session.delete(listing)
        db.session.commit()
        return {'message': 'Successfully deleted!'}
    else:
        return {'errors': ['Unauthorized']}, 401

# Edit listing by id


@listings_routes.route('/<int:listingId>/edit', methods=['PUT'])
@login_required
def update_listing(listingId):
    print("This means I recieved the PUT requested:", listingId)
    listing = Listing.query.get(listingId)

    if not listing:
        return {'errors': ['Listing does not exist']}, 404
    if (listing.user_id != current_user.id):
        return {'errors': ['Unauthorized']}, 401

    form = ListingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form.populate_obj(listing)

        db.session.commit()
        print("Listing is successful:", listing.to_dict())
        return listing.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# Get all Reviews by a Listing's id


@listings_routes.route('/<int:listingId>/reviews')
@login_required
def get_listing_reviews(listingId):
    listing = Listing.query.get(listingId)

    if not listing:
        return {'errors': ['Listing does not exist']}, 404

    reviews = {}
    for review in listing.reviews:
        review_obj = review.to_dict()
        review_obj['user'] = {
            'id': review.user.id,
            'first_name': review.user.first_name,
            'last_name': review.user.last_name,
            'city': review.user.city,
            'state': review.user.state,
            'user_pfp': review.user.profile_picture
        }
        reviews[review_obj["id"]] = review_obj
    return reviews, 200

# Create a review


@listings_routes.route('<int:listingId>/reviews/new', methods=["POST"])
@login_required
def create_review(listingId):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review = Review()

        review.user_id = current_user.id
        review.listing_id = listingId

        # Grabs the user object and assigns it to review.user
        review.user = User.query.get(review.user_id)

        form.populate_obj(review)
        print("is form populating?", review.to_dict())

        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
