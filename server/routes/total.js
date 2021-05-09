const { Router } = require("express");
const router = Router();
const Github = require("../github/github");
const db = require("../github/db");

router.get("/:orgaName", async (req, res) => {
	let github = new Github(req.params.orgaName, req.query.token);
	let total = await db.data.orgas({ name: req.params.orgaName }).get();
	if (!total) {
		total = await github.getOrgStats();
		await db.data.orgas({ name: req.params.orgaName }).set({ stats: total, createdAt: Date.now(), repo: [] });
		return res.send(total);
	}
	res.send(total.stats);
	if (total.createdAt < Date.now() - 5 * 60 * 1000) {
		newTotal = await github.getOrgStats();
		db.data.orgas({ name: req.params.orgaName }).set({ stats: newTotal, createdAt: Date.now(), repo: [] });
	}
});

router.get("/:orgaName/:repoName", async (req, res) => {
	let github = new Github(req.params.orgaName, req.query.token);

	let repo = await db.data.orgas({ name: req.params.orgaName }).repos({ name: req.params.repoName }).get();
	if (!repo) {
		repo = await github.getRepoStats(req.params.repoName);
		await db.data
			.orgas({ name: req.params.orgaName })
			.repo.push({ name: req.params.repoName, stats: repo, createdAt: Date.now() });
		return res.send(repo);
	}
	res.send(repo.stats);
	if (repo.createdAt < Date.now() - 5 * 60 * 1000) {
		let newRepo = await github.getRepoStats(req.params.repoName);
		db.data
			.orgas({ name: req.params.orgaName })
			.repo({ name: req.params.repoName })
			.set({ stats: newRepo, createdAt: Date.now() });
	}
});

module.exports = router;
