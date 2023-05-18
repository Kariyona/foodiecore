from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_reviews():
    review1 = Review(
        rating='5',
        comment='Their pastries are delicious in the morning.',
        user_id=3,
        listing_id=1
    )
    review2 = Review(
        rating='5',
        comment='The ube jam is my favorite. I come every Sunday morning to pick up my weekly jam.',
        user_id=3,
        listing_id=2
    )
    review3 = Review(
        rating='3',
        comment='The boba is a bit too sweet for my taste but a sugar fanatic would love it.',
        user_id=3,
        listing_id=3
    )
    review4 = Review(
        rating='4',
        comment='The bao is authentic and fresh whether I get it myself, or have it delivered to me. It could be a tiny bit more flavorful.',
        user_id=2,
        listing_id=4
    )
    review5 = Review(
        rating='5',
        comment='My favorite brunch spot. The food and service is great. If youre easily gassy, I wouldnt recommend coming here before your meetings.',
        user_id=2,
        listing_id=5
    )
    review6 = Review(
        rating='5',
        comment='Oh my god, the musubi here is mouthwatering. Its a great snack when I want something light but filling for lunch.',
        user_id=2,
        listing_id=6
    )
    review7 = Review(
        rating='2',
        comment='The inside is soft and outside is crunchy as advertised. However, I wasnt a big fan of the ramen burger. Too salty and hard to eat.',
        user_id=1,
        listing_id=7
    )
    review8 = Review(
        rating='5',
        comment='The dumplings here are heavenly! The inside of the restaurant smells equally divine. I brought my in-laws here and they cant wait to come again.',
        user_id=1,
        listing_id=8
    )
    review9 = Review(
        rating='4',
        comment='The skewers were great. They werent exceptional. Id come here if I was invited out but I wouldnt go out of my way to get this.',
        user_id=1,
        listing_id=9
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)
    db.session.add(review8)
    db.session.add(review9)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
