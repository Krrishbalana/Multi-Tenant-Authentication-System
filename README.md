# Multi-Tenant Frontend React App

This is the React frontend application for a role-based multi-tenant system with three user roles: `superadmin`, `admin`, and `user`. It works in conjunction with a backend server that handles authentication, user management, and tenant isolation.

---

## Features

- Login and Signup forms with JWT authentication
- Role-based dashboards:
  - **SuperAdminDashboard**: Overview of tenants and tenant user management
  - **AdminDashboard**: User management for the admin’s own tenant
  - **UserDashboard**: Personal and tenant-specific information for regular users
- Context-based authentication state management using React Context and JWT tokens
- Protected routes with role-based access control using a `PrivateRoute` component
- Dynamic Navbar showing links based on logged-in user’s role
- API integration with backend server for authentication and user/tenant data fetch

---

## Screenshots

### Signup Page

![Signup](public/Screenshot%202025-09-17%20at%204.03.26 PM.png)

### Login Page

![Login](public/Screenshot%202025-09-17%20at%204.03.40 PM.png)

### User Dashboard

![User Dashboard](public/Screenshot%202025-09-17%20at%204.03.58 PM.png)

### Admin Dashboard

![Admin Dashboard](public/Screenshot%202025-09-17%20at%204.06.11 PM.png)

### Super Admin Dashboard

![Super Admin Dashboard](public/Screenshot%202025-09-17%20at%204.05.11 PM.png)

## Prerequisites

- Node.js and npm installed
- Backend server running and accessible (default: `http://localhost:5050/api`)

---

## Setup & Installation

1. Clone the repository and navigate into the frontend folder:

git clone
cd your-frontend-folder

2. Install dependencies:

npm install

3. Configure the backend API URL (if different):

Edit `src/utils/api.js`, look for:

const API_BASE_URL = “http://localhost:5050/api”;

And change it if your backend is running elsewhere.

4. Start the development server:

npm run dev

The app will typically be available at `http://localhost:5173`.

---

## Usage & Testing

### Signup

- Use the signup form to register new **regular users**.
- The signup form requires:
  - Tenant ID (e.g., tenant1)
  - Email
  - Password
- All signed-up users get assigned the `"user"` role by default and have access only to their tenant-specific user dashboard.

---

### Login Credentials for Testing

You can log in with the following predefined accounts created on the backend:

| Role       | Tenant ID | Email                  | Password      |
| ---------- | --------- | ---------------------- | ------------- |
| Superadmin | global    | superadmin@example.com | supersecret   |
| Admin      | tenant1   | admin1@tenant1.com     | adminpassword |

- **Superadmin:** Has the highest privileges. Can view all tenants and all users across tenants. Accesses the Super Admin Dashboard.
- **Admin:** Has rights to manage users within their assigned tenant only. Accesses the Admin Dashboard.
- **User:** Regular users created via signup, limited to personal dashboard and tenant data only.

---

### Navigation

- After login, users are automatically redirected to the appropriate dashboard based on their role.
- Navbar displays links conditionally:
  - All logged-in users see **Dashboard** and **Logout** links.
  - Admins and Superadmins see an **Admin** link.
  - Superadmins additionally see a **Super Admin** link.
- Unauthorized access attempts redirect users to their dashboard or login as appropriate.

---

## Application Structure Overview

- `src/pages/` contains role-specific dashboard components:
  - `SuperAdminDashboard.jsx`
  - `AdminDashboard.jsx`
  - `UserDashboard.jsx`
- `src/context/AuthContext.jsx` manages authentication state and provides login, signup, logout functions.
- `src/routes/PrivateRoute.jsx` guards routes with authentication and role checks.
- `src/utils/api.js` contains the API call helpers and token management code.
- `src/components/Navbar.jsx` renders navigation links dynamically based on user role.

---

## Notes and Best Practices

- JWT tokens are stored in `localStorage` for session persistence; consider security risks and options like HTTP-only cookies for production.
- Backend API URL and JWT secrets should be configured securely in production environments.
- Loading states and error handling are implemented but can be enhanced for better UX.
- The project currently uses in-memory backend user storage for simplicity; integrate a database for production readiness.

---

## Contact / Support

If you encounter any issues or have questions about setup, usage, or extending the app, please reach out or open an issue in the repository.
