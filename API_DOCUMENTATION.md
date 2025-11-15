# 🧹 Clean-Up Backend API Documentation

Complete API documentation for the cleaning services admin dashboard backend.

## 📋 Table of Contents

- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Error Handling](#error-handling)

---

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the `.env` file and update with your credentials:

```bash
# Update the following in .env:
# - DATABASE_URL (your PostgreSQL connection string)
# - JWT_SECRET (generate a secure random string)
# - REFRESH_TOKEN_SECRET (generate a secure random string)
# - CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
```

**Generate secure JWT secrets:**

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Setup Database

Make sure PostgreSQL is running, then:

```bash
# Run database migrations
npm run prisma:migrate

# Seed the database with admin user
npm run prisma:seed
```

**Default Admin Credentials:**
- Email: `admin@cleaningservices.com`
- Password: `Admin@123456`

⚠️ **IMPORTANT:** Change the default password after first login!

### 4. Start the Server

**Development mode (with hot reload):**

```bash
npm run dev
```

**Production mode:**

```bash
npm run build
npm start
```

Server will be running at: `http://localhost:3000`

---

## 🔧 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NODE_ENV` | Environment mode | No | `development` |
| `PORT` | Server port | No | `3000` |
| `DATABASE_URL` | PostgreSQL connection string | Yes | - |
| `JWT_SECRET` | Secret for access tokens (min 32 chars) | Yes | - |
| `JWT_EXPIRES_IN` | Access token expiration | No | `15m` |
| `REFRESH_TOKEN_SECRET` | Secret for refresh tokens (min 32 chars) | Yes | - |
| `REFRESH_TOKEN_EXPIRES_IN` | Refresh token expiration | No | `30d` |
| `BCRYPT_ROUNDS` | Bcrypt hashing rounds | No | `12` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes | - |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes | - |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes | - |
| `CORS_ORIGIN` | Allowed CORS origins | No | `*` |

---

## 🗄️ Database Setup

### PostgreSQL Installation

**Windows:**
Download from [postgresql.org](https://www.postgresql.org/download/windows/)

**macOS:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux:**
```bash
sudo apt-get install postgresql
sudo service postgresql start
```

### Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE cleaning_services;

# Update DATABASE_URL in .env with your credentials
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/cleaning_services?schema=public"
```

---

## 🔌 API Endpoints

### Base URL

```
http://localhost:3000/api
```

---

## 🔐 Authentication

### 1. Admin Login

**Endpoint:** `POST /api/admin/login`

**Request Body:**

```json
{
  "email": "admin@cleaningservices.com",
  "password": "Admin@123456"
}
```

**Response (200 OK):**

```json
{
  "message": "Login successful",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "uuid",
    "email": "admin@cleaningservices.com",
    "name": "Admin User"
  }
}
```

### 2. Refresh Access Token

**Endpoint:** `POST /api/admin/refresh`

**Request Body:**

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200 OK):**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Get Admin Profile

**Endpoint:** `GET /api/admin/profile`

**Headers:**

```
Authorization: Bearer <accessToken>
```

**Response (200 OK):**

```json
{
  "admin": {
    "id": "uuid",
    "email": "admin@cleaningservices.com",
    "name": "Admin User",
    "createdAt": "2025-01-15T10:00:00.000Z",
    "updatedAt": "2025-01-15T10:00:00.000Z"
  }
}
```

---

## 📸 Previous Work Endpoints

### Public Endpoints (No Authentication Required)

#### 1. Get All Previous Work

**Endpoint:** `GET /api/previous-work`

**Query Parameters:**

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `category` | string | Filter by category | - |
| `featured` | boolean | Filter featured work only | - |
| `limit` | number | Number of results (1-100) | 20 |
| `offset` | number | Pagination offset | 0 |

**Example:**

```
GET /api/previous-work?category=Commercial&limit=10&offset=0
```

**Response (200 OK):**

```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Modern Office Deep Cleaning",
      "description": "Complete deep cleaning of a 5000 sq ft office space...",
      "images": [
        "https://res.cloudinary.com/.../image1.jpg",
        "https://res.cloudinary.com/.../image2.jpg"
      ],
      "category": "Commercial",
      "featured": true,
      "createdAt": "2025-01-15T10:00:00.000Z",
      "updatedAt": "2025-01-15T10:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 25,
    "limit": 10,
    "offset": 0,
    "hasMore": true
  }
}
```

#### 2. Get Featured Previous Work

**Endpoint:** `GET /api/previous-work/featured`

**Response (200 OK):**

```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Luxury Home Cleaning",
      "description": "...",
      "images": ["..."],
      "category": "Residential",
      "featured": true,
      "createdAt": "2025-01-15T10:00:00.000Z",
      "updatedAt": "2025-01-15T10:00:00.000Z"
    }
  ]
}
```

#### 3. Get Single Previous Work

**Endpoint:** `GET /api/previous-work/:id`

**Response (200 OK):**

```json
{
  "data": {
    "id": "uuid",
    "title": "Modern Office Deep Cleaning",
    "description": "...",
    "images": ["..."],
    "category": "Commercial",
    "featured": true,
    "createdAt": "2025-01-15T10:00:00.000Z",
    "updatedAt": "2025-01-15T10:00:00.000Z"
  }
}
```

---

### Admin Endpoints (Authentication Required)

All admin endpoints require the `Authorization: Bearer <accessToken>` header.

#### 1. Create Previous Work

**Endpoint:** `POST /api/admin/previous-work`

**Headers:**

```
Authorization: Bearer <accessToken>
Content-Type: multipart/form-data
```

**Form Data:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Work title (max 200 chars) |
| `description` | text | Yes | Detailed description |
| `category` | string | Yes | Category (e.g., "Commercial", "Residential") |
| `featured` | boolean | No | Mark as featured (default: false) |
| `images` | file[] | Yes | 1-10 image files (max 5MB each) |

**Example using cURL:**

```bash
curl -X POST http://localhost:3000/api/admin/previous-work \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -F "title=Office Deep Cleaning" \
  -F "description=Complete cleaning of office space" \
  -F "category=Commercial" \
  -F "featured=true" \
  -F "images=@image1.jpg" \
  -F "images=@image2.jpg"
```

**Example using JavaScript (FormData):**

```javascript
const formData = new FormData();
formData.append('title', 'Office Deep Cleaning');
formData.append('description', 'Complete cleaning of office space');
formData.append('category', 'Commercial');
formData.append('featured', 'true');
formData.append('images', file1); // File object
formData.append('images', file2);

const response = await fetch('http://localhost:3000/api/admin/previous-work', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`
  },
  body: formData
});
```

**Response (201 Created):**

```json
{
  "message": "Previous work created successfully",
  "data": {
    "id": "uuid",
    "title": "Office Deep Cleaning",
    "description": "Complete cleaning of office space",
    "images": [
      "https://res.cloudinary.com/.../image1.jpg",
      "https://res.cloudinary.com/.../image2.jpg"
    ],
    "category": "Commercial",
    "featured": true,
    "createdAt": "2025-01-15T10:00:00.000Z",
    "updatedAt": "2025-01-15T10:00:00.000Z"
  }
}
```

#### 2. Update Previous Work

**Endpoint:** `PUT /api/admin/previous-work/:id`

**Headers:**

```
Authorization: Bearer <accessToken>
Content-Type: multipart/form-data
```

**Form Data (all optional):**

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Updated title |
| `description` | text | Updated description |
| `category` | string | Updated category |
| `featured` | boolean | Update featured status |
| `images` | file[] | Additional images to add |

**Note:** New images will be **added** to existing images, not replace them.

**Response (200 OK):**

```json
{
  "message": "Previous work updated successfully",
  "data": {
    "id": "uuid",
    "title": "Updated Title",
    "description": "Updated description",
    "images": ["existing1.jpg", "existing2.jpg", "new1.jpg"],
    "category": "Commercial",
    "featured": true,
    "createdAt": "2025-01-15T10:00:00.000Z",
    "updatedAt": "2025-01-15T11:00:00.000Z"
  }
}
```

#### 3. Delete Previous Work

**Endpoint:** `DELETE /api/admin/previous-work/:id`

**Headers:**

```
Authorization: Bearer <accessToken>
```

**Response (200 OK):**

```json
{
  "message": "Previous work deleted successfully"
}
```

**Note:** This will also delete all associated images from Cloudinary.

#### 4. Toggle Featured Status

**Endpoint:** `PATCH /api/admin/previous-work/:id/toggle-featured`

**Headers:**

```
Authorization: Bearer <accessToken>
```

**Response (200 OK):**

```json
{
  "message": "Previous work marked as featured",
  "data": {
    "id": "uuid",
    "title": "Office Deep Cleaning",
    "description": "...",
    "images": ["..."],
    "category": "Commercial",
    "featured": true,
    "createdAt": "2025-01-15T10:00:00.000Z",
    "updatedAt": "2025-01-15T11:00:00.000Z"
  }
}
```

#### 5. Delete Single Image

**Endpoint:** `DELETE /api/admin/previous-work/:id/image`

**Headers:**

```
Authorization: Bearer <accessToken>
Content-Type: application/json
```

**Request Body:**

```json
{
  "imageUrl": "https://res.cloudinary.com/.../image1.jpg"
}
```

**Response (200 OK):**

```json
{
  "message": "Image deleted successfully",
  "data": {
    "id": "uuid",
    "title": "Office Deep Cleaning",
    "images": ["https://res.cloudinary.com/.../image2.jpg"],
    "category": "Commercial",
    "featured": true,
    "createdAt": "2025-01-15T10:00:00.000Z",
    "updatedAt": "2025-01-15T11:00:00.000Z"
  }
}
```

**Note:** Cannot delete the last remaining image. At least one image must remain.

---

## ❤️ Health Check

**Endpoint:** `GET /health`

**Response (200 OK):**

```json
{
  "status": "ok",
  "timestamp": "2025-01-15T10:00:00.000Z",
  "environment": "development"
}
```

---

## ⚠️ Error Handling

### Error Response Format

```json
{
  "error": "Error message describing what went wrong"
}
```

For validation errors:

```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "title",
      "message": "Title is required"
    },
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}
```

### Common HTTP Status Codes

| Code | Description |
|------|-------------|
| `200` | Success |
| `201` | Created |
| `400` | Bad Request (validation error, missing data) |
| `401` | Unauthorized (invalid/missing token) |
| `404` | Not Found |
| `409` | Conflict (duplicate record) |
| `500` | Internal Server Error |

---

## 📝 Testing with Postman/Thunder Client

### 1. Import Collection

Create a new collection with the base URL: `http://localhost:3000/api`

### 2. Set Environment Variables

- `baseUrl`: `http://localhost:3000/api`
- `accessToken`: (will be set after login)

### 3. Testing Flow

1. **Login:** POST `/admin/login` → Save `accessToken`
2. **Create Work:** POST `/admin/previous-work` with images
3. **Get All Work:** GET `/previous-work`
4. **Toggle Featured:** PATCH `/admin/previous-work/:id/toggle-featured`
5. **Update Work:** PUT `/admin/previous-work/:id`
6. **Delete Image:** DELETE `/admin/previous-work/:id/image`
7. **Delete Work:** DELETE `/admin/previous-work/:id`

---

## 🔒 Security Best Practices

1. **Change default admin password** immediately after first login
2. **Use strong JWT secrets** (min 32 random characters)
3. **Set proper CORS_ORIGIN** in production (not `*`)
4. **Use HTTPS** in production
5. **Keep secrets secure** - never commit `.env` to version control
6. **Rotate JWT secrets** periodically
7. **Implement rate limiting** for production use

---

## 🐛 Troubleshooting

### Database Connection Error

```
Error: P1001: Can't reach database server
```

**Solution:** Make sure PostgreSQL is running and DATABASE_URL is correct.

### Environment Variable Error

```
Invalid environment variables
```

**Solution:** Check that all required environment variables are set in `.env`

### Cloudinary Upload Error

```
Cloudinary error: Invalid credentials
```

**Solution:** Verify your Cloudinary credentials in `.env`

### Token Expired

```
Invalid or expired token
```

**Solution:** Use the refresh token endpoint to get a new access token.

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

---

**Built with ❤️ for Clean-Up Services**
