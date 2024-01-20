import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: String,
  },
  { timestamps: true }
);

let Topic;
try {
  Topic = mongoose.model("topics");
} catch (error) {
  Topic = mongoose.model("topics", topicSchema);
}
export const topicModel = Topic;
