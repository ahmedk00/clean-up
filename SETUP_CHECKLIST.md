# ✅ Setup Checklist

Follow this checklist to get your Clean-Up Backend up and running.

## 📋 Pre-Installation

- [ ] **Node.js installed** (v18 or higher)
  ```bash
  node --version
  ```

- [ ] **PostgreSQL installed and running**
  - Windows: Download from [postgresql.org](https://www.postgresql.org/download/windows/)
  - macOS: `brew install postgresql && brew services start postgresql`
  - Linux: `sudo apt-get install postgresql && sudo service postgresql start`

- [ ] **Cloudinary account created**
  - Sign up at: [cloudinary.com](https://cloudinary.com)
  - Get credentials from: [cloudinary.com/console](https://cloudinary.com/console)

---

## 🔧 Installation Steps

### 1. Install Dependencies

- [ ] Run: `npm install`
- [ ] Verify no errors in installation

### 2. Setup PostgreSQL Database

- [ ] Open PostgreSQL terminal (psql)
  ```bash
  psql -U postgres
  ```

- [ ] Create database
  ```sql
  CREATE DATABASE cleaning_services;
  \q
  ```

- [ ] Verify database exists
  ```bash
  psql -U postgres -l | grep cleaning_services
  ```

### 3. Configure Environment Variables

- [ ] Copy `.env.example` to `.env` (if needed for reference)

- [ ] Update `DATABASE_URL` in `.env`
  ```env
  DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/cleaning_services?schema=public"
  ```

- [ ] Generate JWT secrets
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```

- [ ] Update JWT secrets in `.env`
  ```env
  JWT_SECRET="<paste generated secret here>"
  REFRESH_TOKEN_SECRET="<paste generated secret here>"
  ```

- [ ] Add Cloudinary credentials to `.env`
  ```env
  CLOUDINARY_CLOUD_NAME=your_cloud_name
  CLOUDINARY_API_KEY=your_api_key
  CLOUDINARY_API_SECRET=your_api_secret
  ```

- [ ] Verify all required env variables are set:
  - `DATABASE_URL` ✓
  - `JWT_SECRET` ✓
  - `REFRESH_TOKEN_SECRET` ✓
  - `CLOUDINARY_CLOUD_NAME` ✓
  - `CLOUDINARY_API_KEY` ✓
  - `CLOUDINARY_API_SECRET` ✓

### 4. Setup Database Schema

- [ ] Generate Prisma client
  ```bash
  npm run prisma:generate
  ```

- [ ] Run database migrations
  ```bash
  npm run prisma:migrate
  ```
  - When prompted, enter migration name: `init`

- [ ] Verify migration succeeded (check for `prisma/migrations` folder)

### 5. Seed Database

- [ ] Run seed script
  ```bash
  npm run prisma:seed
  ```

- [ ] Note down the default admin credentials:
  - Email: `admin@cleaningservices.com`
  - Password: `Admin@123456`

- [ ] **IMPORTANT:** Plan to change this password after first login!

### 6. Start the Server

- [ ] Start in development mode
  ```bash
  npm run dev
  ```

- [ ] Verify server is running
  - Look for the ASCII banner in terminal
  - Server should be at: `http://localhost:3000`

- [ ] Test health check endpoint
  ```bash
  curl http://localhost:3000/health
  ```

---

## 🧪 Testing

### Manual Testing

- [ ] **Test Admin Login**
  - URL: `POST http://localhost:3000/api/admin/login`
  - Body:
    ```json
    {
      "email": "admin@cleaningservices.com",
      "password": "Admin@123456"
    }
    ```
  - Should receive `accessToken` and `refreshToken`

- [ ] **Test Public Endpoint**
  - URL: `GET http://localhost:3000/api/previous-work`
  - Should return sample work created by seed script

- [ ] **Test Protected Endpoint**
  - URL: `GET http://localhost:3000/api/admin/profile`
  - Header: `Authorization: Bearer <your_access_token>`
  - Should return admin profile

### Using Postman/Thunder Client

- [ ] Import `postman-collection-example.json`
- [ ] Set environment variables (`baseUrl`, etc.)
- [ ] Run through the collection tests
- [ ] Verify all endpoints work as expected

---

## 🔒 Security Setup

- [ ] Change default admin password via login and profile update
- [ ] Verify JWT secrets are random and at least 32 characters
- [ ] Set `CORS_ORIGIN` to your frontend URL (for production)
- [ ] Never commit `.env` file to version control
- [ ] Review `.gitignore` includes `.env`

---

## 📱 Optional: Database Management

- [ ] Open Prisma Studio to view/manage data
  ```bash
  npm run prisma:studio
  ```
  - Opens at: `http://localhost:5555`

- [ ] Explore your data:
  - View Admin users
  - View Previous Work entries
  - Test CRUD operations

---

## 🐛 Troubleshooting

### Database Connection Error

**Problem:** `P1001: Can't reach database server`

**Solutions:**
- [ ] Check PostgreSQL is running
- [ ] Verify DATABASE_URL is correct
- [ ] Test connection: `psql -U postgres -d cleaning_services`
- [ ] Check firewall settings

### Environment Variable Error

**Problem:** `Invalid environment variables`

**Solutions:**
- [ ] Check all required variables are in `.env`
- [ ] Verify no typos in variable names
- [ ] Ensure JWT secrets are at least 32 characters
- [ ] Verify Cloudinary credentials are correct

### Prisma Generate Error

**Problem:** Prisma client generation fails

**Solutions:**
- [ ] Delete `node_modules` and reinstall: `npm install`
- [ ] Delete `generated/prisma` folder
- [ ] Run: `npm run prisma:generate` again

### Server Won't Start

**Problem:** Server fails to start

**Solutions:**
- [ ] Check port 3000 is not already in use
- [ ] Try changing `PORT` in `.env`
- [ ] Check for TypeScript compilation errors
- [ ] Review environment variable validation errors

---

## ✅ Final Verification

- [ ] Server runs without errors
- [ ] Can login as admin
- [ ] Can view previous work (public endpoint)
- [ ] Can create new previous work (with image upload)
- [ ] Can update existing work
- [ ] Can delete work
- [ ] Can toggle featured status
- [ ] Images upload successfully to Cloudinary

---

## 🎉 Success!

If all items are checked, your backend is ready to use!

**Next Steps:**
1. Read `API_DOCUMENTATION.md` for detailed API reference
2. Change the default admin password
3. Start building your frontend
4. Test all CRUD operations
5. Deploy to production when ready

**Need Help?**
- Check `README.md` for quick reference
- Review `API_DOCUMENTATION.md` for examples
- Import `postman-collection-example.json` for testing

---

**Built with ❤️ for Clean-Up Services**
