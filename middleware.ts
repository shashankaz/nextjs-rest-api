import { NextResponse } from "next/server";
import authMiddleware from "@/middlewares/api/authMiddleware";

export const config = {
  matcher: "/api/:path*",
};

export default function middleware(request: Request) {
  const authResult = authMiddleware(request);

  if (!authResult.isValid && authResult.response) {
    return authResult.response;
  }

  return NextResponse.next();
}
