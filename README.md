# 🧹 Clean-Up Backend

Backend API for a cleaning services company's admin dashboard to manage previous work portfolio.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Cloudinary account (for image uploads)

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure environment variables:**

   Update the `.env` file with your credentials:
   - PostgreSQL database URL
   - JWT secrets (generate secure random strings)
   - Cloudinary credentials

   **Generate secure secrets:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. **Setup database:**

   ```bash
   # Run migrations
   npm run prisma:migrate

   # Seed admin user
   npm run prisma:seed
   ```

   **Default admin credentials:**
   - Email: `admin@cleaningservices.com`
   - Password: `Admin@123456` ⚠️ Change after first login!

4. **Start the server:**

   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm run build && npm start
   ```

   Server runs at: `http://localhost:3000`

## 📋 Features

✅ JWT-based admin authentication
✅ CRUD operations for previous work portfolio
✅ Multi-image upload with Cloudinary
✅ Featured work highlighting
✅ Category-based filtering
✅ Public API for website display
✅ Complete error handling
✅ Input validation with Zod

## 🔌 API Endpoints

### Public Endpoints

- `GET /api/previous-work` - Get all previous work (with filters)
- `GET /api/previous-work/featured` - Get featured work
- `GET /api/previous-work/:id` - Get single work

### Admin Endpoints (Protected)

**Authentication:**
- `POST /api/admin/login` - Admin login
- `POST /api/admin/refresh` - Refresh access token
- `GET /api/admin/profile` - Get admin profile

**Previous Work Management:**
- `POST /api/admin/previous-work` - Create new work (with image upload)
- `PUT /api/admin/previous-work/:id` - Update work
- `DELETE /api/admin/previous-work/:id` - Delete work
- `PATCH /api/admin/previous-work/:id/toggle-featured` - Toggle featured status
- `DELETE /api/admin/previous-work/:id/image` - Delete single image

**Health Check:**
- `GET /health` - Server health status

## 📖 Full Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete API reference with examples.

## 🗂️ Project Structure

```
clean-up-backend/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── seed.ts                # Database seeding script
│   └── migrations/            # Database migrations
├── src/
│   ├── config/
│   │   ├── env.ts            # Environment validation
│   │   ├── cloudinary.ts     # Cloudinary configuration
│   │   └── database.ts       # Prisma client
│   ├── middleware/
│   │   ├── auth.ts           # JWT authentication
│   │   ├── upload.ts         # File upload handling
│   │   └── errorHandler.ts  # Error handling
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   └── previousWork.controller.ts
│   ├── routes/
│   │   ├── admin.routes.ts   # Protected admin routes
│   │   └── public.routes.ts  # Public routes
│   ├── utils/
│   │   └── validation.ts     # Zod schemas
│   └── server.ts             # Express server
├── .env                       # Environment variables
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Tech Stack

- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT (using Jose)
- **File Upload:** Multer + Cloudinary
- **Validation:** Zod
- **Security:** Bcrypt for password hashing

## 📝 Available Scripts

```bash
npm run dev              # Start development server with hot reload
npm run build            # Compile TypeScript to JavaScript
npm start                # Run production server
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio (database GUI)
npm run prisma:seed      # Seed database with admin user
```

## 🔒 Security

- JWT-based authentication with access and refresh tokens
- Bcrypt password hashing with configurable rounds
- Input validation on all endpoints
- CORS configuration
- Environment variable validation
- Secure file upload with type and size restrictions

## 🌐 CORS Configuration

Default: `*` (all origins allowed for development)

For production, update `CORS_ORIGIN` in `.env` to your frontend URL:

```env
CORS_ORIGIN=https://your-frontend-domain.com
```

## 📦 Database Schema

### Admin Model
- id (UUID)
- email (unique)
- password (hashed)
- name
- timestamps

### PreviousWork Model
- id (UUID)
- title
- description
- images (array of Cloudinary URLs)
- category
- featured (boolean)
- timestamps

## 🐛 Troubleshooting

**Database connection fails:**
- Ensure PostgreSQL is running
- Check DATABASE_URL in `.env`

**Image upload fails:**
- Verify Cloudinary credentials
- Check file size (max 5MB per image)
- Ensure file type is image (jpg, jpeg, png, webp)

**Token expired:**
- Use `/api/admin/refresh` endpoint with refresh token

## 📄 License

MIT

## 👨‍💻 Author

Built for Clean-Up Services

---

**Need help?** Check [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed examples!
