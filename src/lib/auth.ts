import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export interface AdminPayload {
  adminId: string;
  email: string;
}

export function verifyAdminToken(token: string): AdminPayload | null {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback-secret"
    ) as AdminPayload;
    return decoded;
  } catch {
    return null;
  }
}

export function getAdminFromRequest(req: NextRequest): AdminPayload | null {
  const token = req.cookies.get("admin-token")?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}
