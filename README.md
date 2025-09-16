# LocalLoop

LocalLoop is a community–engagement platform that bridges the gap between local councils and citizens.
It lets people create requests, contribute to projects, and track community progress—all in one place.

# Features

**User Authentication & Profiles**
Secure sign-up/login with JWT tokens. Users can update profiles and view their own contributions and requests.

**Project Requests & Contributions**

Curated questions to guide citizens on creating their requests.
Contribution flow where members pledge resources or volunteer time.

**Notifications**

Toast notifications and protected routes keep everyone informed while ensuring privacy.

**Responsive Frontend**
Built with modern React tooling for a smooth experience on desktop and mobile.

**Tech Stack**

| Layer          | Technology                                                    |
| -------------- | ------------------------------------------------------------- |
| **Frontend**   | React + Vite, Axios, React Router, Bootstrap (custom styling) |
| **Backend**    | Django REST Framework + SimpleJWT                             |
| **Database**   | SQLite                                                        |


# Getting Started

These instructions help you set up a local development environment.

Prerequisites

Python 3.10+ and Node 18+

`pip`, `virtualenv`, and `npm` or `yarn`

**1. Backend Setup**

**Clone the repository**
git clone https://github.com/<your-username>/LocalLoop.git
cd LocalLoop/backend

**Create a virtual environment and install dependencies**
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt

**Configure environment variables**
cp .env.example .env   # Edit DB credentials, secret key, etc.

**Run migrations and start the server**
python manage.py migrate
python manage.py runserver

The backend runs at http://localhost:8000 by default.

**2. Frontend Setup**

cd ../frontend

**Install dependencies**
npm install

**Create environment file**
cp .env.example .env    # Set VITE_API_URL to your backend URL

**Start the dev server**
npm run dev

The frontend runs at http://localhost:5173 (or the port Vite chooses).

# Environment Variables

SECRET_KEY=your_django_secret_key
DEBUG=True

# API Overview
Key endpoints (JWT protected where noted)

| Method | Endpoint              | Description                             |
| ------ | --------------------- | --------------------------------------- |
| POST   | `/api/user/register/` | Register a new user                     |
| POST   | `/api/token/`         | Obtain access/refresh JWT tokens        |
| POST   | `/api/token/refresh/` | Refresh access token                    |
| GET    | `/api/projects/`      | List community projects                 |
| POST   | `/api/requests/`      | Create a new project request (auth)     |
| POST   | `/api/contributions/` | Contribute to a request (auth)          |
| GET    | `/api/profile/`       | Retrieve user profile & activity (auth) |


# Project Structure

LocalLoop/                                                                                             
│                                                                                             
├── backend/                                                                                             
│   ├── api/                                                                                             
│   ├── backend/                                                                                             
|   ├── media/project_images                                                                                             
|   ├── venv/                                                                                             
│   ├── db.sqlite3                                                                                             
│   ├── manage.py                                                                                             
│   └── requirements.txt                                                                                             
│                                                                                             
├── frontend/                                                                                             
│   ├── src/                                                                                             
│   │   ├── assets/                                                                                             
│   │   ├── components/                                                                                             
│   │   ├── pages/                                                                                             
│   │   ├── styles/                                                                                             
│   │   ├── App.jsx                                                                                             
│   │   ├── App.css                                                                                             
│   |   └── main.jsx                                                                                             
│   ├── .env                                                                                             
│   └── ...                                                                                             


# Inspiration

LocalLoop was born from a desire to strengthen local communities by making it easy to propose ideas, contribute, and collaborate - all from a simple, friendly web platform
