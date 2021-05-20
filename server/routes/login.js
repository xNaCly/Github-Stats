const { Router } = require("express");
const router = Router();
const { client_secret } = require("../config.json");
const fetch = require("node-fetch");

router.get("/:client_id/:code", async (req, res) => {
	const { client_id, code } = req.params;
	res.append("Access-Control-Allow-Origin", ["*"]);
	if (!client_id || !code)
		return res.status(401).send({ error: "missing code" });
	let res_ = await fetch(
		`https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`,
		{ method: "POST", headers: { Accept: "application/json" } }
	);
	res_ = await res_.json();
	return res.send(res_);
});

module.exports = router;
