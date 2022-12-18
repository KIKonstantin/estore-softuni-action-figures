Softuni Prime Figures

Welcome to the Softuni Prime Figures e-commerce application! This application is built with a Node.js and Express.js backend, and has a frontend built with Angular.
Features

    Browse categories and products on the website
    Add items to the cart and place orders (authentication required)
    Admin panel for managing products, categories, orders, and users
    Dashboard with sales and user/product/order statistics

Getting Started

To get started with the application, follow these steps:

    Clone the repository to your local machine
    Install the dependencies by running npm install in both the root directory and the client directory
    Set up a local MongoDB instance and update the connection string in the config/default.json file
    Run npm run dev in the root directory to start the server and client concurrently
    The application should now be running on http://localhost:4200

API documentation

The API for the Softuni Prime Figures application exposes a number of endpoints for managing orders, products, users, and categories. These endpoints allow you to perform GET, POST, PUT, and DELETE requests as appropriate.

The API uses JSON web tokens for authentication. To access protected routes, a valid token must be provided in the Authorization header of the request.

Passwords are hashed using bcrypt to help increase the security of the application.

If you would like to contribute to the project, please follow these guidelines:

    Create a new branch for your changes
    Make sure to run the linter (npm run lint) and fix any issues before committing your code
    Submit a pull request for review

We welcome any and all contributions to the project!
