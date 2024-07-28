import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "your_secret_key";

interface AuthResult {
  isValid: boolean;
  response?: NextResponse;
  user?: any; 
}

export default function authMiddleware(request: Request): AuthResult {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return {
      isValid: false,
      response: NextResponse.json(
        { message: "Authorization token not provided" },
        { status: 401 }
      ),
    };
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    return { isValid: true, user: decoded };
  } catch (error) {
    return {
      isValid: false,
      response: NextResponse.json(
        { message: "Invalid authorization token" },
        { status: 401 }
      ),
    };
  }
}
