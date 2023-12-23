const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

exports.Program = model("Program", new Schema({
    publishedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pictureLink: { type: String, required: true, },
    title: { type: String, required: true, unique: true },
    description: { type: String },
    programDate: { type: String, required: true },
}));