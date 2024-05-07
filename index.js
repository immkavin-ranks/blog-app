import express from "express";

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
    id: blogs.length + 1,
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

  const blog = blogs[blogId - 1];

  res.render("blog.ejs", { blog, isViewRoute: true });
});


app.get("/edit/:id", (req, res) => {
  const blogId = req.params.id;
  const blog = blogs[blogId - 1];
  console.log(blog);
  res.render("editBlog.ejs", { blog });
});

app.put("/save/:id", (req, res) => {
  const blogId = req.params.id;
  const { title, description, content } = req.body;

  // Find the index of the blog in the array
  const index = blogId - 1;

  // Update the blog with the new values
  blogs[index].title = title;
  blogs[index].description = description;
  blogs[index].content = content;

  res.redirect("/");
});

app.delete("/delete", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Application running on port ${PORT}`);
});
