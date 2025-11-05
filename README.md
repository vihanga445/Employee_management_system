# Employee Management System

A simple Employee Management full-stack project (Spring Boot backend + React frontend) used for learning and small demos. It supports user signup/signin with JWT, and CRUD operations for employees.

This README explains how to run the backend and frontend locally, where to configure database and JWT settings, and lists important endpoints and troubleshooting tips.

Contents
 - Backend: Spring Boot (Java, Maven)
 - Frontend: React (Create React App) with Tailwind utilities

Quick links
 - Backend folder: `employee-management-backend`
 - Frontend folder: `frontend`

Prerequisites
 - Java 21+ (the project declares Java 21)
 - Maven (or use the included `mvnw`/`mvnw.cmd` wrapper)
 - Node.js 16+ and npm (or yarn)
 - MySQL (or another JDBC-compatible database)

Recommended: run backend on port 8080 and frontend on port 3000 (project defaults expect this).

----

Backend (Spring Boot)
----------------------

Location: `employee-management-backend`

What it contains
 - REST controllers for authentication and employee CRUD
 - JWT-based authentication utilities
 - Spring Data JPA configuration and MySQL connector

Configuration
 - Database and JPA options are in `src/main/resources/application.properties`.
 - By default the file points to a local MySQL database at `jdbc:mysql://localhost:3306/employee_mgt`.
 - Update `spring.datasource.username` and `spring.datasource.password` to match your local DB credentials.
 - IMPORTANT: The JWT secret is defined in `JwtUtil.java` as `SECRET_KEY`. Replace this with a secure secret and do NOT commit secrets in source control.

Run (Windows PowerShell)
1. Open a PowerShell in the backend folder:
```powershell
cd 'employee-management-backend'
.\n+
```
2. Use the Maven wrapper to run the app:
```powershell
.\mvnw.cmd spring-boot:run
```
Or, if you have Maven installed:
```powershell
mvn spring-boot:run
```

Build jar
```powershell
.\mvnw.cmd clean package
# then run the jar in target/ if you want
java -jar target\employee-management-backend-0.0.1-SNAPSHOT.jar
```

API highlights
 - Authentication (no separate user service required):
	 - POST /api/auth/signup  -- register a user (body: { username, password })
	 - POST /api/auth/signin  -- returns { token } on success
 - Employee CRUD (JWT protected):
	 - GET  /api/v1/employees
	 - POST /api/v1/employees
	 - GET  /api/v1/employees/{id}
	 - PUT  /api/v1/employees/{id}
	 - DELETE /api/v1/employees/{id}

Notes
 - CORS is enabled for `http://localhost:3000` (frontend host) in the security config.
 - If you change ports or hosts, update the CORS settings in `SecurityConfig.java`.

----

Frontend (React)
----------------

Location: `frontend`

What it contains
 - React app created with Create React App
 - Pages/components: Home, Login, Signup, EmployeeList, EmployeeForm, Navbar
 - Uses `axios` for API calls and Tailwind utility classes for styling (Tailwind is included as a devDependency).

Run (Windows PowerShell)
```powershell
cd 'frontend'
npm install
npm start
```
The app will start on http://localhost:3000 by default.

Build for production
```powershell
cd 'frontend'
npm run build
# serve the build folder with a static server or integrate into backend if desired
```

Notes on styling
 - Tailwind is declared as a devDependency. If Tailwind utilities are not compiling you may need to run the project toolchain (Create React App normally handles css imports). If you didn't configure Tailwind manually, some utility classes may still be present from earlier project scaffolding.

----

Quick start (both)
1. Start database (MySQL) and ensure a database `employee_mgt` exists, or let the app create it if your DB user has privileges.
2. Start backend (see backend run commands above).
3. Start frontend (`npm start` in the `frontend` folder).

Open http://localhost:3000 in your browser. Use the Signup page to create a user, then login to access the employee list and add/edit employees.

Troubleshooting
 - Port conflicts: if 8080 or 3000 are in use, stop the conflicting service or change the ports (backend: `application.properties` or Spring Boot env var, frontend: set `PORT` env var before `npm start`).
 - Database errors: check `application.properties` credentials and ensure the DB server is reachable.
 - CORS / auth errors: ensure front-end sends Authorization: Bearer <token> for protected requests. If tokens are invalid, check `JwtUtil`'s secret.
 - Tailwind CSS not applied: make sure PostCSS/Tailwind are configured. You can remove Tailwind classes or convert them to normal CSS if needed.

Development notes & security
 - Do NOT commit secrets (database passwords, JWT secrets) to the repository. Use environment variables or an external config for production.
 - The current JWT secret is hard-coded for demo purposes. Replace it with a secure value and prefer loading it from environment variables (e.g., `SPRING_JWT_SECRET`).

