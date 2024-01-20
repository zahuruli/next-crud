import { ConnectDb } from "@/config/ConnectDb";
import { topicModel } from "@/models/TopicModel/TopicModel";
import { NextResponse } from "next/server";
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
