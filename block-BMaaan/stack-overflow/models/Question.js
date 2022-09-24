const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    text: {type: String, required: true},
    description: {type: String},
    tags: [{type:Schema.Types.ObjectId, ref: "Tags"}],
    vote: {type: Number, default: 0},
    views: {type: Number, default: 0, min: 0},
    author: {type: Schema.TypesObjectId, ref: "User"},
    answer: [{type: Schema.TypesObjectId, ref: "Answer"}], 
    replies: [{type: Schema.TypesObjectId, ref: "Reply"}],
},
{timestampss: true}
);
questionSchema.index({ title: "text" });
questionSchema.index({ tags: 1 });

module.exports = mongoose.model("Question", questionSchema);
