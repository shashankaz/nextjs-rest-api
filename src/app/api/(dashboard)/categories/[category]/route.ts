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

export const PATCH = async (request: Request, context: { params: any }) => {
  const categoryId = context.params.category;
  try {
    const { title } = await request.json();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { success: false, message: "Invalid or missing userId" },
        { status: 400 }
      );
    }

    if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
      return NextResponse.json(
        { success: false, message: "Invalid or missing categoryId" },
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

    const category = await Category.findOne({ _id: categoryId, user: userId });
    if (!category) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    category.title = title;
    await category.save();

    return NextResponse.json(
      { success: true, message: "Category updated successfully", category },
      { status: 200 }
    );
  } catch (error: any) {
    return handleServerError(error);
  }
};

export const DELETE = async (request: Request, context: { params: any }) => {
  const categoryId = context.params.category;
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { success: false, message: "Invalid or missing userId" },
        { status: 400 }
      );
    }

    if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
      return NextResponse.json(
        { success: false, message: "Invalid or missing categoryId" },
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

    const category = await Category.findOne({ _id: categoryId, user: userId });
    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found or does not belong to the user",
        },
        { status: 404 }
      );
    }

    await Category.findByIdAndDelete(categoryId);

    return NextResponse.json(
      { success: true, message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return handleServerError(error);
  }
};
