const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema); // Capitalized model name

module.exports = Post;
