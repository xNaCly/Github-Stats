const { Router } = require("express");
const router = Router();
const Github = require("../github/github");
const db = require("../github/db");

router.get("/:orgaName", async (req, res) => {
	const token = req.header("Authorization");
	res.set("Access-Control-Allow-Origin", "*");
	let total = await db.data.orgas({ name: req.params.orgaName }).get();
	if (!token) return res.send({});
	let github = new Github(req.params.orgaName, token);

	if (!total) {
		const repoNames = await github.getAllRepoNames();
		total = await github.getOrgStats(repoNames);
		await db.data
			.orgas({ name: req.params.orgaName })
			.set({ stats: total, createdAt: Date.now(), repo: [] });
		return res.send(total);
	}
	res.send(total.stats);
	if (total.createdAt < Date.now() - 5 * 60 * 1000) {
		const repoNames = await github.getAllRepoNames();
		newTotal = await github.getOrgStats(repoNames);
		db.data
			.orgas({ name: req.params.orgaName })
			.set({ stats: newTotal, createdAt: Date.now(), repo: [] });
	}
});

// router.get("/:orgaName/:repoName", async (req, res) => {
// 	const token = req.header("Authorization");
// 	res.append("Access-Control-Allow-Origin", ["*"]);
// 	if (!token) return res.status(401).send({ error: "missing auth header" });
// 	let github = new Github(req.params.orgaName, token);

// 	let repo = await db.data.orgas({ name: req.params.orgaName }).repos({ name: req.params.repoName }).get();
// 	if (!repo) {
// 		repo = await github.getRepoStats(req.params.repoName);
// 		await db.data
// 			.orgas({ name: req.params.orgaName })
// 			.repo.push({ name: req.params.repoName, stats: repo, createdAt: Date.now() });
// 		return res.send(repo);
// 	}
// 	res.send(repo.stats);
// 	if (repo.createdAt < Date.now() - 10 * 60 * 1000) {
// 		let newRepo = await github.getRepoStats(req.params.repoName);
// 		db.data
// 			.orgas({ name: req.params.orgaName })
// 			.repo({ name: req.params.repoName })
// 			.set({ stats: newRepo, createdAt: Date.now() });
// 	}
// });

module.exports = router;
