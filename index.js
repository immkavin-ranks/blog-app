import express from "express";
import {v4 as uuidv4} from "uuid"

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(express.static("public"));

let blogs = [];

app.get("/", (req, res) => {
  res.render("index.ejs", { blogs, isViewRoute: false });
});

// CRUD routes

app.post("/create", (req, res) => {
  const { title, description, content } = req.body;
  const newBlog = {
    id: uuidv4(),
    title,
    description,
    content,
    createdDate: new Date().toDateString(),
  };

  blogs.push(newBlog);

  res.redirect("/");
});
app.get("/view/:id", (req, res) => {
  const blogId = req.params.id;

  const blog = blogs.find((blog) => blog.id === blogId);

  res.render("blog.ejs", { blog, isViewRoute: true });
});

app.get("/edit/:id", (req, res) => {
  const blogId = req.params.id;
  const blog = blogs.find((blog) => blog.id === blogId);
  res.render("editBlog.ejs", { blog, isEditRoute: true });
});

app.post("/save/:id", (req, res) => {
  const blogId = req.params.id;
  const { title, description, content } = req.body;

  // Find the index of the blog in the array
  const index = blogs.findIndex((blog) => blog.id === blogId);

  // Update the blog with the new values
  blogs[index].title = title;
  blogs[index].description = description;
  blogs[index].content = content;

  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  const blogId = req.params.id;

  const index = blogs.findIndex((blog) => blog.id === blogId);

  blogs.splice(index, 1);

  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Application running on port ${PORT}`);
});
