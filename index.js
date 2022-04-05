const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const flash = require("connect-flash");

mongoose.connect();

global.loggedIn = null;

const app = new express();
app.set("view engine", "ejs");

const validateMiddleWare = require("./middleware/validationMiddleware");
const authMiddleware = require("./middleware/authMiddleware");
const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(flash());
app.use(
	expressSession({
		secret: "keyboard cat",
	})
);
app.use("*", (req, res, next) => {
	loggedIn = req.session.userId;
	next();
});

app.use("/post/store", validateMiddleWare);

const homeController = require("./controllers/home");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");
const newPostController = require("./controllers/newPost");
const newUserController = require("./controllers/newUser");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser");
const logoutController = require("./controllers/logout");

app.get("/auth/register", redirectIfAuthenticatedMiddleware, newUserController);
app.post(
	"/users/register",
	redirectIfAuthenticatedMiddleware,
	storeUserController
);
app.get("/auth/login", redirectIfAuthenticatedMiddleware, loginController);
app.post(
	"/users/login",
	redirectIfAuthenticatedMiddleware,
	loginUserController
);
app.get("/auth/logout", logoutController);

app.get("/post/new", authMiddleware, newPostController);
app.get("/", homeController);
app.post("/post/store", authMiddleware, storePostController);
app.get("/post/:id", getPostController);

app.use((req, res) => res.render("notfound"));
// let port = process.env.PORT;
// if (port === nul || port === "") {
// 	port = 4000;
// }

app.listen(process.env.PORT || 3000, () => {
	console.log("App listening...");
});
