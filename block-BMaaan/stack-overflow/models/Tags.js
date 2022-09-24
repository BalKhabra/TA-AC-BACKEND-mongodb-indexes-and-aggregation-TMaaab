const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagsSchema = new Schema({
    name: { type: String, required: true },
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  });

module.exports = mongoose.model("Tags", tagsSchema);