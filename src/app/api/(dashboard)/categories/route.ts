import connect from "@/lib/db";
import User from "@/lib/modals/user";
import Category from "@/lib/modals/category";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

const handleServerError = (error: any) => {
  console.error(error.message);
  return NextResponse.json(
    { success: false, message: "Internal Server Error" },
    { status: 500 }
  );
};

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { success: false, message: "Invalid or missing userId" },
        { status: 400 }
      );
    }

    await connect();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found in the database" },
        { status: 404 }
      );
    }

    const categories = await Category.find({ user: userId });

    return NextResponse.json(
      {
        success: true,
        message: "Categories retrieved successfully",
        categories,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return handleServerError(error);
  }
};

export const POST = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const { title } = await request.json();

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { success: false, message: "Invalid or missing userId" },
        { status: 400 }
      );
    }

    await connect();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const newCategory = new Category({ title, user: userId });
    await newCategory.save();

    return NextResponse.json(
      {
        success: true,
        message: "Category created successfully",
        category: newCategory,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return handleServerError(error);
  }
};
