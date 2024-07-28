import connect from "@/lib/db";
import User from "@/lib/modals/user";
import Category from "@/lib/modals/category";
import Blog from "@/lib/modals/blog";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

const handleServerError = (error: any) => {
  console.error(error.message);
  return NextResponse.json(
    { success: false, message: "Internal Server Error" },
    { status: 500 }
  );
};

export const GET = async (request: Request, context: { params: any }) => {
  const blogId = context.params.blog;

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const categoryId = searchParams.get("categoryId");

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

    if (!blogId || !Types.ObjectId.isValid(blogId)) {
      return NextResponse.json(
        { success: false, message: "Invalid or missing blogId" },
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

    const category = await Category.findById(categoryId);
    if (!category) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    const blog = await Blog.findOne({
      _id: blogId,
      user: userId,
      category: categoryId,
    });

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Blog retrieved successfully", blog },
      { status: 200 }
    );
  } catch (error: any) {
    return handleServerError(error);
  }
};

export const PATCH = async (request: Request, context: { params: any }) => {
  const blogId = context.params.blog;

  try {
    const body = await request.json();
    const { title, description } = body;

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { success: false, message: "Invalid or missing userId" },
        { status: 400 }
      );
    }

    if (!blogId || !Types.ObjectId.isValid(blogId)) {
      return NextResponse.json(
        { success: false, message: "Invalid or missing blogId" },
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

    const blog = await Blog.findOne({ _id: blogId, user: userId });
    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { title, description },
      { new: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Blog updated successfully",
        blog: updatedBlog,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return handleServerError(error);
  }
};

export const DELETE = async (request: Request, context: { params: any }) => {
  const blogId = context.params.blog;

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { success: false, message: "Invalid or missing userId" },
        { status: 400 }
      );
    }

    if (!blogId || !Types.ObjectId.isValid(blogId)) {
      return NextResponse.json(
        { success: false, message: "Invalid or missing blogId" },
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

    const blog = await Blog.findOne({ _id: blogId, user: userId });
    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    await Blog.findByIdAndDelete(blogId);

    return NextResponse.json(
      { success: true, message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return handleServerError(error);
  }
};
