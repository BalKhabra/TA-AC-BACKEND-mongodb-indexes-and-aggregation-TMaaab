const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const replySchema = new Schema({
    text: {type: String, required: true},
    vote: {type: Number, default: 0},
    author: {type: Schema.TypesObjectId, ref: "User"},
    answerId: {type: Schema.TypesObjectId, ref: "Answer"},
});

module.exports = mongoose.model("Reply", replySchema);