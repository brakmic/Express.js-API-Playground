# Express-Demo Application

- [Express-Demo Application](#express-demo-application)
  - [Overview](#overview)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
    - [Swagger UI](#swagger-ui)
    - [Scripts](#scripts)
  - [Directory Structure](#directory-structure)
  - [Additional Information](#additional-information)
  - [License](#license)

## Overview
The Express-Demo application is a Node.js/Express.js server written in TypeScript, aimed at testing and demonstrating several integrations including OpenAPI, SQLite3, MongoDB, and various middlewares. This application showcases a structured approach to handling functionalities like logging, authentication, and database operations in a Node.js environment.

## Features
- **OpenAPI Integration**: The application adheres to OpenAPI specifications, aiding in the design, building, and interaction with APIs. It also provides a Swagger UI for a user-friendly API interaction.
- **Middleware Utilization**: Implements various middlewares for logging, authentication (JWT), and error handling.
- **Database Strategies**: Incorporates a strategy pattern for interchangeable database operations. Supports MongoDB, SQLite, and a no-database option for testing or lightweight purposes.
- **Database Operations**: Provides structured means to create, read, update, and delete (CRUD) user data.
- **Authentication**: Utilizes JSON Web Tokens (JWT) for authentication.
- **Error Handling**: Includes middleware for capturing and responding to errors in a structured format.
- **Testing Tokens**: Provides a script to generate JWTs for testing.

## Getting Started

### Prerequisites
Ensure you have the following installed on your machine:
- Node.js
- TypeScript
- A supported database (MongoDB/SQLite) or none for the no-database strategy.

### Installation
1. Clone the repository to your local machine.
2. Run `npm install` to install all necessary dependencies listed in the `package.json` file.
3. Set the desired `DB_STRATEGY` in your environment variables or in a `.env` file. Options are 'mongodb', 'sqlite', or 'nodb'.
4. If using a database, ensure it's running and accessible.

### Running the Application
- Use `npm run start` to start the application. This will compile the TypeScript files and start the server at `http://localhost:3000`.
- Use `npm run dev` for development mode with hot-reload.
- For generating a JWT for testing, run `npm run get:token`.

### Swagger UI
Access the Swagger UI at `http://localhost:3000/api-docs` to interact with the API in a user-friendly manner.

### Scripts
Various scripts are provided for convenience:
- `start`: Starts the application.
- `build`: Compiles TypeScript files.
- `get:token`: Generates a JWT for testing purposes.
- `dev`: Starts the application in development mode with hot-reload.

## Directory Structure
```plaintext
.
├── LICENSE
├── README.md
├── node_modules
├── nodemon.json
├── package.json
├── src
│   ├── assets
│   │   └── favicon.ico
│   ├── authentication
│   │   └── jwt.strategy.ts
│   ├── bootstrap.ts
│   ├── controllers
│   │   ├── home
│   │   ├── index.ts
│   │   └── users
│   ├── index.ts
│   ├── middlewares
│   │   ├── authentication
│   │   ├── index.ts
│   │   ├── logging
│   │   └── openapi
│   ├── persistence
│   │   ├── db
│   │   ├── index.ts
│   │   ├── models
│   │   ├── strategy
│   │   └── vendor
│   └── test
│       └── get_token.ts
└── tsconfig.json
```

## Additional Information
There are [known issues](https://github.com/brakmic/Express.js-API-Playground/blob/main/src/index.ts#L2) related to `openapi3-ts` version conflicts which require certain hacks as documented in the source code. These hacks will be removed once the underlying libraries resolve the conflicts.

## License
[MIT](https://github.com/brakmic/Express.js-API-Playground/blob/main/LICENSE)
