from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', first_name="Missy", last_name="Catto", profile_picture='https://i.imgur.com/GAzKhUL.jpg', city="San Francisco", state="CA")
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', first_name="Crazy", last_name="Cat", profile_picture='https://i.imgur.com/TVb6SjL.jpg', city="Salinas", state="CA")
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', first_name="Mister", last_name="Basura", profile_picture='https://i.imgur.com/HZJX5zb.jpg', city="Chicago", state="IL")

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
