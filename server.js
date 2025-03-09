const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/post");
const methodOverride = require("method-override");
const morgan = require("morgan");

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

mongoose.connection.on("error", (error) => {
  console.log(`An error connecting to MongoDB has occurred: ${error}`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/", async (req, res) => {
  const allPosts = await Post.find({});
  res.render("posts.ejs", { posts: allPosts });
});

app.get("/posts", async (req, res) => {
  const allPosts = await Post.find({});
  res.render("posts.ejs", { posts: allPosts });
});

app.get("/posts/:postId", async (req, res) => {
  const foundPost = await Post.findById(req.params.postId);
  res.render("show.ejs", { post: foundPost });
});

app.delete("/posts/:postId", async (req, res) => {
  await Post.findByIdAndDelete(req.params.postId);
  res.redirect("/posts");
});

app.get("/posts/:postId/edit", async (req, res) => {
  const foundPost = await Post.findById(req.params.postId);
  res.render("edit.ejs", { post: foundPost });
});

app.put("/posts/:postId", async (req, res) => {
  await Post.findByIdAndUpdate(req.params.postId, req.body);
  res.redirect(`/posts/${req.params.postId}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
