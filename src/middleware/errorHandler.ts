import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  // Log error for debugging
  console.error("Error:", err);

  // Zod validation errors
  if (err instanceof ZodError) {
    res.status(400).json({
      error: "Validation failed",
      details: err.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
    return;
  }

  // Multer errors
  if (err.name === "MulterError") {
    if (err.code === "LIMIT_FILE_SIZE") {
      res.status(400).json({ error: "File size too large. Maximum 5MB allowed." });
      return;
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      res.status(400).json({ error: "Too many files. Maximum 10 files allowed." });
      return;
    }
    res.status(400).json({ error: err.message });
    return;
  }

  // Prisma errors
  if (err.code && err.code.startsWith("P")) {
    if (err.code === "P2002") {
      res.status(409).json({ error: "A record with this information already exists" });
      return;
    }
    if (err.code === "P2025") {
      res.status(404).json({ error: "Record not found" });
      return;
    }
    res.status(500).json({ error: "Database error occurred" });
    return;
  }

  // Default error response
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
  });
}

// Not found handler
export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  });
}
