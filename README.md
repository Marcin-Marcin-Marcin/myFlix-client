myFlix Client

The myFlix Client is a single-page application (SPA) built with React that connects to the myFlix API. It allows users to browse movies, view detailed information, register/login, manage user profiles, and save favorite movies.

The application supports authenticated users and uses react-router-dom for routing and React Bootstrap for responsive layout.

Features

• User registration and login (JWT-based authentication)
• Browse a list of movies fetched from the external API
• View detailed information for each movie, including director, genre, and description
• Add/remove movies to/from a list of favorites
• View and edit user profile (username, password, email, birthday)
• Delete user account (deregistration)
• Responsive design using Bootstrap

Technologies Used

• React
• React Router
• Bootstrap & React Bootstrap
• localStorage
• Parcel

Dependencies

• react
• react-dom
• react-router-dom
• react-bootstrap
• bootstrap

API Integration

The client interacts with the myFlix API hosted on https://mymyflixapp-46a281636c8c.herokuapp.com

Available endpoints used in this app include:

• POST /login
• POST /users
• GET /movies
• GET /movies/:Titl
• GET /movies/genre/:genreName
• GET /movies/director/:directorName
• PUT /users/:Username
• POST /users/:Username/movies/:MovieID
• DELETE /users/:Username/movies/:MovieID
• DELETE /users/:Username

This client works with the myFlix API, a RESTful API built with:

• Node.js
• Express
• MongoDB
• Mongoose
• Passport + JWT
• Morgan
• CORS
• bcrypt
