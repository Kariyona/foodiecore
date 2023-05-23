from flask import Blueprint, request
from app.models import Review, db
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages

# Create Blueprint for reviews routes
reviews_routes = Blueprint('reviews', __name__)

@reviews_routes.route('')
@login_required
def get_reviews():
    all_reviews = Review.query.all()

    reviews = {}
    for review in all_reviews:
        obj = review.to_dict()

        reviews[obj["id"]] = obj
    return reviews, 200

# Get review by review id
@reviews_routes.route('/<int:reviewId>')
@login_required
def get_review(reviewId):
    review = Review.query.get(reviewId)

    if not review:
        return {'errors': ['Review does not exist']}, 404

    return review.to_dict(), 200

# Create a review
# @reviews_routes.route('/new', methods=["POST"])
# @login_required
# def create_review():
