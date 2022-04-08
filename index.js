const express = require("express");
const app = new express();
const ejs = require("ejs");

const mongoose = require("mongoose");
mongoose.connect(
	
);

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(express.static("public"));

const fileUpload = require("express-fileupload");
app.use(fileUpload());
const validateMiddleware = require("./middleware/validationMiddleware");

// app.use("/posts/store", validateMiddleware);

const newPostController = require("./controllers/newPost");
const homeController = require("./controllers/home");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");
const aboutController = require("./controllers/about");

app.get("/", homeController);
app.get("/about", aboutController);
app.get("/post/:id", getPostController);
app.post("/posts/store", storePostController);

app.get("/posts/new", newPostController);

app.use((req, res) => res.render("notfound"));

const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log("App listening on port 4000");
});
