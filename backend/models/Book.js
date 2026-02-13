const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    author: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    semester: {
      type: String,
      required: true
    },

    department: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    image: {
      type: String, // Cloudinary image URL
      required: true
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    isApproved: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Book", bookSchema);
