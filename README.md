# park-well

[![Coverage Status](https://coveralls.io/repos/github/KaiserPhemi/park-well/badge.svg?branch=master)](https://coveralls.io/github/KaiserPhemi/park-well?branch=master)
[![CircleCI](https://circleci.com/gh/KaiserPhemi/park-well.svg?style=svg)](https://circleci.com/gh/KaiserPhemi/park-well)

## About

API for a Parking application that manages parking spaces.

## Technology Stack

- [NodeJS](https://nodejs.org/en/)
- [ExpressJS](https://expressjs.com/)
- [SequelizeJS](http://docs.sequelizejs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/)

## API

- [API Documentation]()

## Features

The following features make up the `park-well` API:

### Authentication

- It uses JSON Web Token (JWT) for authentication.
- It generates a token on successful login and returns it to the user.
- It verifies the token to ensure a user is authenticated to access endpoints.

### Users

- There three types of users
  - `operator`: User with access to the system but no admin rights.
  - `admin`: User with admin rights to the system.
  - `default`: The default user with no access to the system.
- Allows users to create account.
- Allows users to login and obtain a unique token.
- Allows authenticated users to retrieve and update their information.
- Allows `admin` users to change other users' role.
- Allows `admin` to create other admins.

### Roles

- It ensures roles can be created by an admin user.
- A non-admin cannot access this endpoint.

### Cars

- Allows registration of car details.
- Allows modification & deletion of car details.

### Parking Space

- Allows a new p[arking space to be added.
- Allows modification of a parking space
- Parking spaces cannot be deleted.

### Parking Activities

- Allows creation of a parking activity
- Allows modificaiton of a parking activity
- Parking activities can not be deleted.

## Author

- Oluwafemi Akinwa
