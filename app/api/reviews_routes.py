from flask import Blueprint, request
from app.models import Review, db
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from ..forms.review_form import ReviewForm

# Create Blueprint for reviews routes
reviews_routes = Blueprint('reviews', __name__)

# Get all reviews


@reviews_routes.route('')
@login_required
def get_reviews():
    all_reviews = Review.query.all()

    reviews = {}
    for review in all_reviews:
        obj = review.to_dict()

        reviews[obj["id"]] = obj
    return reviews, 200

# Get all reviews of a current user


# Get review by review id
@reviews_routes.route('/<int:reviewId>')
@login_required
def get_review(reviewId):
    review = Review.query.get(reviewId)

    if not review:
        return {'errors': ['Review does not exist']}, 404

    review_data_obj = review.to_dict()
    review_data_obj['user'] = {
        'id': review.user.id,
        'first_name': review.user.first_name,
        'last_name': review.user.last_name,
        'city': review.user.city,
        'state': review.user.state,
        'user_pfp': review.user.profile_picture
    }
    return review_data_obj, 200

# Edit a review


@reviews_routes.route('/<int:reviewId>/edit', methods=['PUT'])
@login_required
def edit_review(reviewId):
    review = Review.query.get(reviewId)

    if not review:
        return {'errors': ['Review does not exist']}, 404
    if (review.user_id != current_user.id):
        return {'errors': ['Unauthorized']}, 401

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form.populate_obj(review)

        db.session.commit()
        return review.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# Delete a review
@reviews_routes.route('/<int:reviewId>/delete', methods=['DELETE'])
@login_required
def delete_review(reviewId):
    review = Review.query.get(reviewId)

    if not review:
        return {'errors': ['Review does not exist']}, 404

    if review.user_id == current_user.id:
        db.session.delete(review)
        db.session.commit()
        return {'message': 'Review has successfully been deleted!'}
    else:
        return {'errors': ['Unauthorized']}, 401
