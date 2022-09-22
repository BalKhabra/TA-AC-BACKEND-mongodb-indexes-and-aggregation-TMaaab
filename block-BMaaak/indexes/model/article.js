const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema ({
    title: {type: String},
    description: { type: String},
    tags: [{ type: String}]
});

articleSchema.index({title: "text"}, {description: "text"});
articleSchema.index ({tags: 1});

module.exports = mongoose.model ("Article", articleSchema);