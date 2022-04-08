const BlogPost = require("../models/BlogPost");
const { truncate } = require("../function/truncate");

module.exports = async (req, res) => {
	const blogposts = await BlogPost.find({});
	res.render("index", { blogposts, truncate });
};
