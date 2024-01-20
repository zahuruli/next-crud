import { ConnectDb } from "@/config/ConnectDb";
import { topicModel } from "@/models/TopicModel/TopicModel";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const { id } = params;
    await ConnectDb();
    const topics = await topicModel.findById(id);
    return NextResponse.json({
      success: true,
      status: 200,
      message: "topic found successfully",
      topics,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      status: 401,
      message: "Error !! while finding a topic",
      error: error.message,
    });
  }
};

export const PUT = async (req, { params }) => {
  try {
    const { id } = params;
    const { title, desc } = await req.json();
    await ConnectDb();
    const topics = await topicModel.findByIdAndUpdate(
      id,
      { title, desc },
      { new: true }
    );
    return NextResponse.json({
      success: true,
      status: 200,
      message: "topic updated successfully",
      topics,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      status: 401,
      message: "Error !! while updating a topic",
      error: error.message,
    });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    const { id } = params;
    await ConnectDb();
    await topicModel.findByIdAndDelete(id);
    return NextResponse.json({
      success: true,
      status: 200,
      message: "topic deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      status: 401,
      message: "Error !! while deleting a topic",
      error: error.message,
    });
  }
};
