const { Router } = require("express");
const router = Router();
const fetch = require("node-fetch");

router.get("/", async (req, res) => {
	const token = req.header("Authorization");
	res.append("Access-Control-Allow-Origin", ["*"]);
	if (!token) return res.status(401).send({ error: "missing code" });
	let res_ = await fetch("https://api.github.com/user", {
		method: "GET",
		headers: {
			Accept: "application/json",
			Authorization: `token ${token}`,
		},
	});
	res_ = await res_.json();
	return res.send({
		avatar: res_.avatar_url,
		url: res_.html_url,
		name: res_.login,
	});
});

module.exports = router;
