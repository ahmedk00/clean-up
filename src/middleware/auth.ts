import { Request, Response, NextFunction } from "express";
import { jwtVerify, SignJWT } from "jose";
import { env } from "../config/env";

// Extend Express Request type to include admin
declare global {
  namespace Express {
    interface Request {
      admin?: {
        id: string;
        email: string;
        name: string;
      };
    }
  }
}

// Generate access token
export async function generateAccessToken(payload: { id: string; email: string; name: string }) {
  const secret = new TextEncoder().encode(env.JWT_SECRET);

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(env.JWT_EXPIRES_IN)
    .sign(secret);

  return token;
}

// Generate refresh token
export async function generateRefreshToken(payload: { id: string }) {
  const secret = new TextEncoder().encode(env.REFRESH_TOKEN_SECRET);

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(env.REFRESH_TOKEN_EXPIRES_IN)
    .sign(secret);

  return token;
}

// Verify access token
export async function verifyAccessToken(token: string) {
  try {
    const secret = new TextEncoder().encode(env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload as { id: string; email: string; name: string };
  } catch (error) {
    return null;
  }
}

// Verify refresh token
export async function verifyRefreshToken(token: string) {
  try {
    const secret = new TextEncoder().encode(env.REFRESH_TOKEN_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload as { id: string };
  } catch (error) {
    return null;
  }
}

// Authentication middleware
export async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    // Get token from cookie or Authorization header
    let token: string | undefined;

    // First check cookies
    if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }
    // Fallback to Authorization header
    else {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7); // Remove "Bearer " prefix
      }
    }

    if (!token) {
      res.status(401).json({ error: "No token provided" });
      return;
    }

    const payload = await verifyAccessToken(token);

    if (!payload) {
      res.status(401).json({ error: "Invalid or expired token" });
      return;
    }

    req.admin = payload;
    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication failed" });
  }
}
