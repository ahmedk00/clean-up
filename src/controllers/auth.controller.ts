import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../config/database";
import { env } from "../config/env";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../middleware/auth";
import { loginSchema } from "../utils/validation";

// Admin login
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    // Validate request body
    const { email, password } = loginSchema.parse(req.body);

    // Find admin by email
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    // Generate tokens
    const accessToken = await generateAccessToken({
      id: admin.id,
      email: admin.email,
      name: admin.name,
    });

    const refreshToken = await generateRefreshToken({
      id: admin.id,
    });

    // Return tokens and admin info
    res.json({
      message: "Login successful",
      accessToken,
      refreshToken,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Refresh access token
export async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({ error: "Refresh token is required" });
      return;
    }

    // Verify refresh token
    const payload = await verifyRefreshToken(refreshToken);

    if (!payload) {
      res.status(401).json({ error: "Invalid or expired refresh token" });
      return;
    }

    // Get admin details
    const admin = await prisma.admin.findUnique({
      where: { id: payload.id },
    });

    if (!admin) {
      res.status(404).json({ error: "Admin not found" });
      return;
    }

    // Generate new access token
    const accessToken = await generateAccessToken({
      id: admin.id,
      email: admin.email,
      name: admin.name,
    });

    res.json({
      accessToken,
    });
  } catch (error) {
    next(error);
  }
}

// Get current admin profile
export async function getProfile(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.admin) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    const admin = await prisma.admin.findUnique({
      where: { id: req.admin.id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!admin) {
      res.status(404).json({ error: "Admin not found" });
      return;
    }

    res.json({ admin });
  } catch (error) {
    next(error);
  }
}

// Admin logout
export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.admin) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    // For stateless JWT, we simply return success
    // The client should delete the tokens from storage
    res.json({
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
}
