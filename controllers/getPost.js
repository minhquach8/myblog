const BlogPost = require("../models/BlogPost");
const { truncate } = require("../function/truncate");

module.exports = async (req, res) => {
	const blogpost = await BlogPost.findById(req.params.id);
	res.render("post", {
		blogpost,
		truncate,
	});
};
