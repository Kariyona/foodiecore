from app.models import db, Listing, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_listings():
    listing1 = Listing(
        title='A&M Patisserie',
        address='Pop-Up Shop',
        city='San Jose',
        state='CA',
        country='United States',
        hours='5-9',
        image_url="https://i.imgur.com/XG6nQAW.png",
        description='A&M Pâtisserie specializes in European pastries combining French pastry techniques and Asian flavors. We offer a variety of petite pastries such as Portuguese Egg Tarts, Macarons, Choux, and more...',
        user_id=1
    )
    listing2 = Listing(
        title='All Things Ube Dessert',
        address='613 Pearl St',
        city='La Jolla',
        state='CA',
        country='United States',
        hours='5-9',
        image_url="https://i.imgur.com/dz1gBbE.png",
        description="All Things Ube started off as a simple conversation Daphne and Dennis had in 2018 with memories of Daphnes father and how he would love to always offer her ube desserts when she was younger. She was fortunate enough for him to share his secret ube halaya jam recipe with her which is a core ingredient in each of All Things Ube desserts. Spread Ube not Hate.",
        user_id=1
    )
    listing3 = Listing(
        title='Bearology',
        address='400 S. Baldwin Avenue',
        city='Arcadia',
        state='CA',
        country='United States',
        hours='5-9',
        image_url="https://i.imgur.com/JcqYryO.png",
        description="Life is sweet with more boba. Made with real fruits and premium quality loose tea leaves, Bearology's drinks are perfect for any kind of day",
        user_id=1
    )
    listing4 = Listing(
        title='Bun Bao',
        address='450 S 1st St',
        city='San Jose',
        state='CA',
        country='United States',
        hours='5-9',
        image_url="https://i.imgur.com/k2lkt67.jpg",
        description='Fresh Made Authentic Steamed Bun & Dumpling. Available via Delivery, Farmers Market, Food Truck, Catering',
        user_id=2
    )
    listing5 = Listing(
        title='Egghausted',
		address='Pop-Up Shop',
        city='Los Angeles',
        state='CA',
        country='United States',
        hours='5-9',
        image_url="https://i.imgur.com/0MPB3LT.png",
        description='EgghaustedLA is a premier and authentic Food Court that has been proudly serving the San Francisco area and beyond since 2000. Since then, our mission has been to provide high-quality food for all those that wish to combine fun and enjoyable ambiance with skillful cooking into one extraordinary dining experience.',
        user_id=2
    )
    listing6 = Listing(
        title='Musubi Mama',
		address='913 Meridian Ave, S',
        city='Pasadena',
        state='CA',
        country='United States',
        hours='5-9',
        image_url="https://i.imgur.com/s9IHXSN.png",
        description='Nearly a decade ago when Carol and Phil Kwan started developing what would become Mama Musubi, the sister and brother team set out to offer wholesome, delicious and portable food to people who didnt want to compromise healthful meals for convenience. The musubi - a triangular rice ball filled with a variety of savory fish, vegetables and other goodies wrapped in nori seaweed - had long been a favorite way to grab a quick, nutritious meal on the go for many generations of Japanese, and Mama Musubi aims to offer the same to busy Angelenos.',
        user_id=2
    )
    listing7 = Listing(
        title='Nikuyama Ramen Burger',
		address='Pop-Up Shop',
        city='New York City',
        state='NY',
        country='United States',
        hours='5-9',
        image_url="https://i.imgur.com/O9Ilo0V.jpg",
        description="Fresh ramen noodles are boiled and pressed into “buns” then lightly seared with sesame oil. Crispy on the outside, chewy on the inside! Those buns then sandwich a juicy beef patty on a bed of arugula. To finish, theyre topped with a generous sprinkling of scallion.",
        user_id=3
    )
    listing8 = Listing(
        title='The Drunken Dumpling',
		address='1414 Park Ave',
        city='Chico',
        state='CA',
        country='United States',
        hours='5-9',
        image_url="https://i.imgur.com/pti4wfe.jpg",
        description='Drunken Dumpling was created in 2018 as a food cart with the intention of bringing an interactive culinary experience to the city of Chico. We love food, we love flavor and we love our community. We aim to offer handmade, high quality dishes at an affordable price and believe good food should be enjoyed by everyone. It is our mission to share our passion of hospitality and Eastern cuisine to anyone eager for culinary adventure. Come dine with us and experience love through flavor!',
        user_id=3
    )
    listing9 = Listing(
        title='Tiger Sticks',
		address='National City',
        city='San Diego',
        state='CA',
        country='United States',
        hours='5-9',
        image_url="https://i.imgur.com/LKCgSeF.png",
        description='Yakitori (Japanese style skewers) made with fresh ingredients and glazed with our signature Suave Te',
        user_id=3
    )

    db.session.add(listing1)
    db.session.add(listing2)
    db.session.add(listing3)
    db.session.add(listing4)
    db.session.add(listing5)
    db.session.add(listing6)
    db.session.add(listing7)
    db.session.add(listing8)
    db.session.add(listing9)
    db.session.commit()

def undo_listings():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.listings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM listings"))

    db.session.commit()
