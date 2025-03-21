# REST API Project

This project is a basic diary application developed as a beginner project, featuring a Django REST API backend and a React frontend.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [Documentation](#documentation)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)


## Introduction

The REST API Project is a basic diary application designed to help users manage their daily entries. It serves as a beginner project to demonstrate the integration of a Django REST API with a React frontend.

## Features

- Create, read, update, and delete diary entries
- Responsive user interface built with React

## Installation

To set up the project locally, follow these steps:

### 1. Clone the repository:

```bash
git clone https://github.com/UnnatMalik/REST_API_Project.git
```

### 2. Navigate to the project directory:

```bash
cd REST_API_Project
```

### 3. Backend Setup:

- Navigate to the backend directory:

  ```bash
  cd reactdiarybackend
  ```

- Create and activate a virtual environment:

  ```bash
  python -m venv env
  source env/bin/activate  # On Windows, use 'env\Scripts\activate'
  ```

- Install the required Python packages:

  ```bash
  pip install -r requirements.txt
  ```

- Apply database migrations:

  ```bash
  python manage.py migrate
  ```

- Create a superuser account:

  ```bash
  python manage.py createsuperuser
  ```

- Start the Django development server:

  ```bash
  python manage.py runserver
  ```

### 4. Frontend Setup:

- Navigate to the frontend directory:

  ```bash
  cd ../diary-app
  ```

- Install the required Node.js packages:

  ```bash
  npm install
  ```

- Start the React development server:

  ```bash
  npm start
  ```

## Usage

Once both the backend and frontend servers are running:

- Access the React frontend at `http://localhost:3000/`.
- Use the application to manage your diary entries.
- The backend API is accessible at `http://localhost:8000/api/`.

## Dependencies

### Backend:

- Django
- Django REST Framework
- MySQL (Database)

### Frontend:

- React

## Configuration

- **Backend:** Configuration settings can be modified in `reactdiarybackend/settings.py`.
- **Frontend:** API endpoints and other settings can be adjusted in the React application files within the `diary-app` directory.

## Documentation

For detailed information on the Django REST API and React components, refer to the respective directories:

- **Backend:** `reactdiarybackend/`
- **Frontend:** `diary-app/`

## Examples

After setting up the project, you can:

- Create new diary entries.
- Edit or delete existing entries.

## Troubleshooting

- **Database Errors:** Ensure that migrations are applied correctly and the database is set up.
- **Server Issues:** Verify that both backend and frontend servers are running without errors.
- **Dependency Problems:** Check that all dependencies are installed as per the `requirements.txt` and `package.json` files.

## Contributors

- **Unnat Malik** - [GitHub Profile](https://github.com/UnnatMalik)


