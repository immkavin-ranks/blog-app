import express from "express";

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

// CRUD routes
app.post("/create", (req, res) => {});
app.get("/view", (req, res) => {});
app.put("/edit", (req, res) => {});
app.delete("/delete", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Application running on port ${PORT}`);
});