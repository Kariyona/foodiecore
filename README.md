# Foodiecore
      
Remotebnb is a soft clone of Airbnb. With recent events, many people have found themselves working remotely. Remotebnb wants to provide a service where remote workers can find cool new places to work. 

Check out [Foodiecore](https://foodiecore.onrender.com/) 

## Index

[MVP Feature List](https://github.com/Kariyona/foodiecore/wiki/MVP-Feature-List) |
[Database Scheme](https://github.com/Kariyona/foodiecore/wiki/Database-Schema-and-Back-End-Routes) |
[User Stories](https://github.com/Kariyona/foodiecore/wiki/User-Stories) |
[Wire Frames](https://github.com/Kariyona/foodiecore/wiki/Wireframes-and-Front-End-Routes) |

## Technologies Used

<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" /><img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" /><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /><img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" /><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />
add python and flask

## Splash Page
![splash]()

## Listings
![spots]()

## One listing page and reviews
![ezgif com-gif-maker]()


## Getting started
1. Clone this repository:

   `
   https://github.com/Kariyona/foodiecore.git
   `
2. Install denpendencies into the Backed and the Frontend by making a terminal for each one and then run the following:

   * `npm install`

3. Create a **.env** file using the **.envexample** provided 

4. Set up your database with information from your .env and then run the following to create your database, migrate, and seed: 
 
   * `flask db migrate`
   * `flask db upgrade` 
   * `flask seed all`

5. Start the app for the backend using:
   * `pipenv run flask run`
   
5.5 Start the app for both backend and frontend using:
   * `npm start`

6. Now you can use the Demo User or Create an account

## Amazon Web Services S3
* For setting up your AWS refer to this [guide](https://github.com/jdrichardsappacad/aws-s3-pern-demo)

***

# Features 

## Listings
* Users can create a Listing
* Users can read/view other Listing
* Users can update their Listing
* Users can delete their Listing

## Reviews
* Users can create Reviews on Listings
* users can read/view all of the Reviews on a Listing
* Users can delete their Review(s) on a Listing

