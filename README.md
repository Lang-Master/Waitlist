# Waitlist (Node.js/Express, React/Next.js, MySQL/Prisma)

This repository contains a full-stack application for managing a product waitlist. The backend uses Node.js, Express, and Prisma to connect to a MySQL database, and the frontend is a modern React/Next.js application.

## 🚀 1. Prerequisites

Before you begin, ensure you have the following installed on your system:

* **Node.js** (v18 or higher recommended)
* **MySQL Server** (and a client like MySQL Workbench for managing the database)

---

## 2. Backend Setup (API & Database)

The backend service runs on port `3000` and handles API requests and database logic using Prisma.

### a. Installation

1.  Navigate to the root `/backend` directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### b. Database Configuration

1.  **MySQL Server:** Ensure your local MySQL server is running (typically on port `3306`).
2.  **Create Database:** Log into MySQL and create the database specified in your project schema:
    ```sql
    CREATE DATABASE waiting_list;
    ```
3.  **Create `.env` File:** In the root of the `/backend` directory, create a file named **`.env`** and add your connection string, replacing the placeholders with your actual MySQL credentials:
    ```env
    DATABASE_URL="mysql://root:<your_password>@localhost:3306/waiting_list"
    PORT=3000
    ```

### c. Schema Migration (Prisma)

You must run the Prisma migration command to apply the data model defined in `schema.prisma` and create the necessary `waitlistEntry` table in your MySQL database.

1.  Run the migration command:
    ```bash
    npx prisma migrate dev --name init
    ```

### d. Run the Backend

Start the Express server in development mode:

```bash
npm run dev

## 3. Frontend Setup
1. npm install
2. npm run dev
