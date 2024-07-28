
# Python rules engine

This project consists of a frontend (fe directory) built with React and a backend (be directory) developed using Python and Flask.

---

## Project Goal

The goal of this project is to create a secure, scalable, and user-friendly web application that facilitates seamless user authentication, efficient data management, and dynamic rule engine configuration. By leveraging OAuth 2.0 for secure authentication and providing a comprehensive API for frontend-backend communication, the project aims to deliver a robust solution for handling sensitive user data and complex business processes. The rules engine, built on top of Python, can be configured through the React-based frontend to enable flexible and powerful business logic management.

---

## Frontend Features

The frontend, built with React, offers several key features:

1. **User Authentication**:
   - Login and registration forms are implemented to handle user authentication.
   - Components like `Login.js` manage the login process.

2. **Navigation**:
   - The application has a structured navigation system with a sidebar, header, and footer.
   - Files like `AppSidebar.js`, `AppHeader.js`, and `AppFooter.js` handle the respective UI elements.

3. **API Integration**:
   - The frontend communicates with the backend via API calls.
   - The `api` directory contains files like `api.js` and `operation-api.js` for handling API requests.

4. **UI Components**:
   - A variety of reusable UI components are available, including buttons, forms, tables, and notifications.
   - These components are located in the `components` directory.

5. **State Management**:
   - Redux is used for state management.
   - The `redux` directory contains action creators and reducers, such as `view-action-creator.js` and `views-reducer.js`.

6. **Routing**:
   - The application uses React Router for navigation between different views.
   - The `routes.js` file defines the routes for the application.

7. **Styling**:
   - SCSS is used for styling the application.
   - Styles are defined in the `scss` directory, with files like `_layout.scss` and `style.scss`.

8. **Testing**:
   - Jest is configured for testing.
   - Test files, such as `App.test.js`, are included to ensure the components function correctly.

9. **Custom Components**:
   - Custom components are available for specific functionalities, like `DynamicSelect.js` and `smart-select.component.js`.

10. **Documentation**:
    - Documentation files, including `README.md` and `CHANGELOG.md`, provide detailed information about the project's setup, features, and version history.

---

## Backend Features

The backend, developed using Python and Flask, is structured to handle various functionalities, focusing on OAuth 2.0 authentication and API endpoints for the application.

1. **OAuth 2.0 Provider**:
   - Implements an OAuth 2.0 server using Authlib.
   - Supports various grant types: Authorization Code Grant, Password Grant, Client Credentials Grant, and Refresh Token Grant.
   - Files like `oauth2.py`, `models.py`, and `routes.py` are crucial for these functionalities.

2. **Database Management**:
   - Uses Flask-SQLAlchemy for ORM and database interactions.
   - Models are defined in `models.py` for users, OAuth2 clients, authorization codes, and tokens.
   - MongoDB is also used for specific data storage needs, as defined in `database.py`.

3. **API Endpoints**:
   - Several API endpoints are provided for different functionalities, such as user information, claims processing, rule management, and report generation.
   - Key routes are defined in `routes.py`, handling requests and responses.

4. **User Management**:
   - Handles user registration, login, and session management.
   - The `User` model in `models.py` defines the user schema and methods for authentication.

5. **Client Management**:
   - Allows creating and managing OAuth2 clients.
   - Routes for client creation and management are defined in `routes.py`.

6. **Claims Processing**:
   - Includes endpoints for managing and processing insurance claims.
   - Functions in `claims.py` and `reports.py` handle loading and summarizing claims data.

7. **Rule Engine**:
   - Implements a rule engine for processing business rules.
   - The `rules_engine.py` file defines methods for loading, testing, and applying rules.

8. **Configuration and Settings**:
   - Configurations are managed through environment variables and configuration files.
   - `settings.py` and the app initialization in `app.py` handle these configurations.

9. **Templates**:
   - Uses Jinja2 templates for rendering HTML pages.
   - Templates for authorization and client creation are in the `templates` directory.

10. **Cross-Origin Resource Sharing (CORS)**:
    - Implements CORS to handle cross-origin requests.
    - Configured in `routes.py` using Flask-CORS.

11. **API Documentation and Testing**:
    - Documentation for the API is provided in `README.md`.
    - The backend is structured to be testable with unit tests for various components.

---

These features make the project robust and capable of handling secure authentication, data management, and comprehensive API support for the frontend application, creating a dynamic, user-friendly, and maintainable web application.
