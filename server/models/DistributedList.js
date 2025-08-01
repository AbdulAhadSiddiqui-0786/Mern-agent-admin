import mongoose from "mongoose";

const distributedSchema = new mongoose.Schema(
  {
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent", // Reference to Agent model
      required: true,
    },
    data: [
      {
        firstName: {
          type: String,
          required: true,
          trim: true,
        },
        phone: {
          type: String,
          required: true,
          match: /^[0-9]{7,15}$/, // Simple digit-only phone validation
        },
        notes: {
          type: String,
          default: "",
          trim: true,
        },
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export default mongoose.model("DistributedList", distributedSchema);
