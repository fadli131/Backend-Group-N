const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

exports.Event = model("Event", new Schema({
    publishedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pictureLink: { type: String, required: true, },
    title: { type: String, required: true, unique: true },
    description: { type: String },
    eventDate: { type: String, required: true },
    eventLink: { type: String, required: true, unique: true },
}));