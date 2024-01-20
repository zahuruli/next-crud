import { ConnectDb } from "@/config/ConnectDb";
import { topicModel } from "@/models/TopicModel/TopicModel";
import { NextResponse } from "next/server";

//create a topics:
export const POST = async (req) => {
  try {
    const { title, desc } = await req.json();
    await ConnectDb();
    const createdTopic = await topicModel.create({ title, desc });
    return NextResponse.json({
      status: 200,
      success: true,
      message: "Topics created successfuly",
      topics: createdTopic,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error while creating topics!!",
      error: error.message,
    });
  }
};

//get all topics:
export const GET = async (req) => {
  try {
    const id = req.nextUrl.searchParams.get("id");
    await ConnectDb();

    let topics;
    if (id) {
      topics = await topicModel.findOne({ _id: id });
    } else {
      topics = await topicModel.find({});
    }
    return NextResponse.json({
      status: 200,
      success: true,
      message: "Topic found successfuly",
      topics,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error while finding single topic!!",
      error: error.message,
    });
  }
};

//get all topics:
export const DELETE = async (req) => {
  try {
    const id = req.nextUrl.searchParams.get("id");
    await ConnectDb();

    await topicModel.deleteOne({ _id: id });
    const topics = await topicModel.find({});
    return NextResponse.json({
      status: 200,
      success: true,
      message: "Topic deleted successfuly",
      topics,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error while deleting single topic!!",
      error: error.message,
    });
  }
};

//get all topics:
export const PUT = async (req) => {
  try {
    const id = req.nextUrl.searchParams.get("id");
    const { title, desc } = await req.json();
    await ConnectDb();

    const topics = await topicModel.findOneAndUpdate(
      { _id: id },
      { title, desc },
      { new: true }
    );
    return NextResponse.json({
      status: 200,
      success: true,
      message: "Topic updated successfuly",
      topics,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error while updating single topic!!",
      error: error.message,
    });
  }
};
