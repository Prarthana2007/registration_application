# StudentConnect - React Login and Registration System

## Aim
To develop a simple student-focused login and registration web application using React.js with form validation, browser storage, authentication flow, and a dashboard interface.

## Description
StudentConnect is a frontend learning application designed to demonstrate core React concepts such as components, state management, validation, browser storage, and conditional page rendering. The application allows users to register, log in, view a dashboard, and log out securely using browser storage without any backend service.

## Objectives
- Build a Vite React application using JavaScript and JSX.
- Create reusable React components for login, registration, and dashboard.
- Implement client-side validation for registration and login forms.
- Use localStorage for storing user account data.
- Use sessionStorage for active login session management.
- Display a student-focused dashboard after successful authentication.
- Ensure the application is responsive and accessible.

## Features
- Original StudentConnect interface design
- Registration form with validation
- Login form with validation
- Password hashing in browser storage
- Session-based dashboard access
- Dashboard with student summary cards
- Logout flow that clears the active session
- Responsive layout for desktop, tablet, and mobile
- No backend or database required

## Technologies Used
- React.js
- Vite
- JavaScript
- JSX
- CSS3
- Browser localStorage
- Browser sessionStorage
- npm

## Project Structure
```text
student-connect/
├── index.html
├── package.json
├── README.md
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── auth.js
│   ├── index.css
│   └── main.jsx
└── public/
```

## Installation Steps
1. Open the project folder in VS Code.
2. Make sure Node.js and npm are installed.
3. Run the following command:

```bash
npm install
```

## Commands to Run
```bash
npm install
npm run dev
npm run build
npm run preview
```

## Application Flow
1. User opens the app.
2. If no active session exists, the login page appears.
3. User can create a new account through registration.
4. After successful registration, the app redirects to login.
5. User logs in using registered credentials.
6. On successful login, sessionStorage stores the active session.
7. User sees the dashboard with profile and student statistics.
8. User clicks logout to clear the session and return to login.

## Testing
- Empty registration form validation
- Invalid email validation
- Password length check
- Password mismatch
- Successful registration
- Wrong password login attempt
- Successful login
- Dashboard visibility
- Logout functionality
- Refresh while logged in
- Refresh after logout

## Expected Output
- Registration and login pages load correctly.
- User details are stored in localStorage without plain text password storage.
- Login session persists until logout.
- Dashboard shows student details and key metrics.
- Build process completes successfully with Vite.

## Limitations
- This app is a frontend-only demonstration.
- Authentication data is stored in the browser using localStorage and sessionStorage.
- It does not include a real backend, database, or production-grade security.
- The project is intended for learning and laboratory demonstration purposes.

> This is a frontend learning application. Authentication data is stored in the browser only.
