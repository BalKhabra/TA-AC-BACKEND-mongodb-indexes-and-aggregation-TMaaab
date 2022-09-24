const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    text: {type: String, required: true},
    vote: {type: Number, default: 0},
    author: {type: Schema.TypesObjectId, ref: "User"},
    replies: [{type: Schema.TypesObjectId, ref: "Reply"}],
    questionId: {type: Schema.TypesObjectId, ref: "Question"},
});

module.exports = mongoose.model("Answer", answerSchema);