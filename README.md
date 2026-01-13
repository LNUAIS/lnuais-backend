# LNU AIS Backend

Complete Express.js/Node.js backend for the LNU AIS student organization website.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (AWS RDS)
- **ORM**: Sequelize
- **Email**: Nodemailer
- **Deployment**: AWS Elastic Beanstalk (Ready)

## Project Structure
```
lnuais-backend/
├── src/
│   ├── config/       # Database configuration
│   ├── controllers/  # Route logic
│   ├── middleware/   # Validation and Error handling
│   ├── models/       # Sequelize models
│   ├── routes/       # API route definitions
│   └── utils/        # Utility functions (Email)
├── .env.example      # Environment variables template
├── server.js         # Entry point
└── README.md         # This file
```

## Setup & Local Development

1. **Clone the repository**
   ```bash
   git clone git@github.com:youni20/lnuais-backend.git
   cd lnuais-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   - Create a `.env` file in the root directory.
   - Copy contents from `.env.example`:
     ```bash
     cp .env.example .env
     ```
   - Fill in your database and email credentials.

4. **Run the server**
   - Development (with hot-reload):
     ```bash
     npm run dev
     ```
   - Production:
     ```bash
     npm start
     ```

## API Endpoints

### Health Check 
- **GET** `/api/health`
  - Returns server status.

### Users
- **POST** `/api/users/register`
  - Register a new user.
  - Body: `{ full_name, email, programme, experience_level }`
- **GET** `/api/users`
  - Get all users (paginated).
  - Query: `?page=1&limit=10`
- **GET** `/api/users/:id`
  - Get user details by ID.
- **PUT** `/api/users/:id`
  - Update user details.
- **DELETE** `/api/users/:id`
  - Delete a user.

## Deployment to AWS Elastic Beanstalk

1. **Prerequisites**
   - AWS CLI installed and configured.
   - EB CLI installed (`pip install awsebcli`).

2. **Initialize EB Application**
   ```bash
   eb init
   # Select region (eu-north-1)
   # Select Node.js platform
   # Do not set up SSH unless needed
   ```

3. **Set Environment Variables on EB**
   ```bash
   eb setenv PORT=5000 DB_HOST=... DB_USER=... DB_PASS=...
   ```
   *Note: Ensure all `.env` variables are set in the EB environment configuration.*

4. **Deploy**
   ```bash
   eb create lnuais-backend-prod
   # Or if already created:
   eb deploy
   ```

5. **Open**
   ```bash
   eb open
   ```

## Database Schema
The application uses **Sequelize** to automatically sync the schema. On start, it will create/update the `users` table:
- `id` (Integer, PK)
- `full_name` (Text)
- `email` (Text, Unique)
- `programme` (Text)
- `experience_level` (Enum: Beginner, Intermediate, Advanced)
- `created_at`, `updated_at` (Timestamp)
