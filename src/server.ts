import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./config/env";
import adminRoutes from "./routes/admin.routes";
import publicRoutes from "./routes/public.routes";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";

// Swagger
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerOptions from "./utils/swaggerOptions";

const app = express();

// Middleware
app.use(cors({
  origin: env.CORS_ORIGIN,
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
  });
});

// ================== Swagger ==================
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// API Routes
app.use("/api/admin", adminRoutes);
app.use("/api", publicRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════╗
║  🧹 Clean-Up Backend Server                        ║
╠════════════════════════════════════════════════════╣
║  Environment: ${env.NODE_ENV.padEnd(37)}║
║  Server:      http://localhost:${PORT.toString().padEnd(26)}║
║  Status:      ✅ Running                            ║
╚════════════════════════════════════════════════════╝

📋 Available Routes:

  🔓 Public:
    GET  /api/previous-work
    GET  /api/previous-work/featured
    GET  /api/previous-work/:id

  🔐 Admin:
    POST   /api/admin/login
    POST   /api/admin/refresh
    GET    /api/admin/profile
    POST   /api/admin/previous-work
    PUT    /api/admin/previous-work/:id
    DELETE /api/admin/previous-work/:id
    PATCH  /api/admin/previous-work/:id/toggle-featured
    DELETE /api/admin/previous-work/:id/image

  ❤️  Health: GET /health
  `);
});

export default app;
