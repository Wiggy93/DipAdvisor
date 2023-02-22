const mongoose = require("mongoose");
const locationSchema = new mongoose.Schema(
  {
    _id: Number,
    location_name: { type: String, required: true, unique: true },
    coordinates: { type: Array },
    created_by: { type: String, required: true },
    created_at: { type: Date, immutable: true, default: () => Date.now() },
    image_urls: Array,
    votes: { type: Number, default: 0 },
    comments: Array,
    description: { type: String, required: true, maxLength: 1000 },
    depth: String,
    water_temp: String,
    public: { type: Boolean, required: true },
    dangerous: { type: Boolean, default: false },
  },
  {
    _id: false,
  }
);
module.exports = mongoose.model("Location", locationSchema);
