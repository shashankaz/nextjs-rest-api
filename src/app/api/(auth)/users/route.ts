import connect from "@/lib/db";
import User from "@/lib/modals/user";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

const ObjectId = Types.ObjectId;

const handleServerError = (error: any) => {
  console.error(error.message);
  return NextResponse.json(
    { success: false, message: "Internal Server Error" },
    { status: 500 }
  );
};

export const GET = async () => {
  try {
    await connect();
    const users = await User.find();
    return NextResponse.json(
      { success: true, message: "Users retrieved successfully", users },
      { status: 200 }
    );
  } catch (error: any) {
    return handleServerError(error);
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();
    const newUser = new User(body);
    await newUser.save();

    return NextResponse.json(
      { success: true, message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error: any) {
    return handleServerError(error);
  }
};

export const PATCH = async (request: Request) => {
  try {
    const body = await request.json();
    const { userId, newUsername } = body;

    if (!userId || !newUsername) {
      return NextResponse.json(
        { success: false, message: "User ID or new username not provided" },
        { status: 400 }
      );
    }

    if (!ObjectId.isValid(userId)) {
      return NextResponse.json(
        { success: false, message: "Invalid User ID" },
        { status: 400 }
      );
    }

    await connect();
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username: newUsername },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User updated successfully",
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return handleServerError(error);
  }
};

export const DELETE = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID not provided" },
        { status: 400 }
      );
    }

    if (!ObjectId.isValid(userId)) {
      return NextResponse.json(
        { success: false, message: "Invalid User ID" },
        { status: 400 }
      );
    }

    await connect();
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User deleted successfully",
        user: deletedUser,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return handleServerError(error);
  }
};
