Blog CRUD Platform - Frontend

This is the frontend for a Blog CRUD platform built using Vite, React (TypeScript), and Tailwind CSS. It allows users to register, log in, and manage blog posts (create, update, delete). The frontend communicates with the backend API using Axios and handles global state using Redux Toolkit with Redux Persist for state persistence. Form handling is managed by Formik with Yup for validation.

Technologies Used
Vite (React with TypeScript)
Tailwind CSS (for styling)
Axios (for HTTP requests)
Redux Toolkit (for state management)
Redux Persist (for state persistence)
Formik & Yup (for form handling and validation)
AWS (for hosting)

Prerequisites
Before running the frontend locally, ensure you have the following installed on your machine:

Node.js (v14.x or higher)
npm (v6.x or higher)


Here's a detailed README.md for the frontend of your Blog CRUD platform, including instructions for setting it up locally and accessing the deployed version:

Blog CRUD Platform - Frontend
This is the frontend for a Blog CRUD platform built using Vite, React (TypeScript), and Tailwind CSS. It allows users to register, log in, and manage blog posts (create, update, delete). The frontend communicates with the backend API using Axios and handles global state using Redux Toolkit with Redux Persist for state persistence. Form handling is managed by Formik with Yup for validation.

Features
User Authentication: Users can register, log in, and stay logged in across sessions using Redux Persist.
Blog Management (CRUD): Users can create, read, update, and delete their blog posts.
Responsive Design: The frontend is built with Tailwind CSS, ensuring it works well on all devices.
Form Validation: Forms are managed using Formik with Yup for validation.
Technologies Used
Vite (React with TypeScript)
Tailwind CSS (for styling)
Axios (for HTTP requests)
Redux Toolkit (for state management)
Redux Persist (for state persistence)
Formik & Yup (for form handling and validation)
AWS (for hosting)
Prerequisites
Before running the frontend locally, ensure you have the following installed on your machine:

Node.js (v14.x or higher)
npm (v6.x or higher)
Getting Started (Local Setup)
Follow these instructions to set up the frontend application locally.

1. Clone the repository
git clone <repository-url>
cd frontend
2. Install Dependencies
npm install
3. Set Up Environment Variables
Create a .env file in the root directory and add the necessary variables.
4. Start the Development Server
Once you've configured your environment variables, start the development server:
npm run dev

Deployed Version
The frontend is deployed and hosted on AWS. You can access the deployed version via the following URL:

https://blogger.ananthuks.online

Deployment Instructions
To deploy the frontend on AWS:

Build the frontend:
npm run build
This will create a production-ready build in the dist/ directory.

Contact
For any queries or issues, please contact:

Email: ananthudev224@gmail.com