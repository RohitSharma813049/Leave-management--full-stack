# My Leave Management Backend (Node.js + Express + MongoDB + Mongoose)

### Custom Leave Management System Backend

## 1) Install & Run

```bash
# unzip this folder first
npm install
cp .env.example .env   # edit if needed
npm run dev            # or: npm start
```

Server: **http://localhost:9000**  
API base: **http://localhost:9000/api**

## 2) Default admin (auto created)
- email: **admin@example.com**
- password: **admin123**

## 3) Endpoints

**Auth**
- POST `/api/auth/register`
- POST `/api/auth/login` -> `{ token, name, role }`

**Employee**
- GET `/api/leaves`
- POST `/api/leaves`

**Admin only**
- GET `/api/leaves/pending`
- POST `/api/leaves/:id/approve`
- POST `/api/leaves/:id/reject`
- GET `/api/dashboard/stats`
- GET `/api/dashboard/recent`

## 4) Connect from React

Point your axios instance to:
```
http://localhost:8000/api
```
Attach the JWT in `Authorization: Bearer <token>` for protected routes.
