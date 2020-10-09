const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  originalUrl: { type: String, require: true },
  shortUrl: { type: String, require: true, unique: true, sparse: true },
  code: { type: String, require: true, unique: true, sparse: true },
  date: { type: String, default: Date.now },
  clicks: { type: Number, default: 0 },
  owner: { type: Types.ObjectId, ref: "User" },
});

module.exports = model("Link", schema);
