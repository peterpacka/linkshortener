import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    shorter: {
      type: String,
      unique: true,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Link || mongoose.model("Link", linkSchema);
