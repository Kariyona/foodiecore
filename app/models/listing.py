from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Listing(db.Model):
    __tablename__ = "listings"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False, unique=True)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100), nullable=False)
    country = db.Column(db.String(100), nullable=False)
    hours = db.Column(db.String, nullable=False)
    # days_of_week = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.Date, default=datetime.today)
    updated_at = db.Column(db.Date, default=datetime.today)

    # user can have multiple listings associated with them
    user = db.relationship('User', back_populates='listings')
    reviews = db.relationship('Review', back_populates='listing')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'country': self.country,
            'hours': self.hours,
            # 'days_of_week': self.days_of_week,
            'description': self.description,
            'image_url': self.image_url,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
