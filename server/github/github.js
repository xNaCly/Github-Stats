const fetch = require("node-fetch");

class Github {
	constructor(organisationName, auth) {
		this.organisationName = organisationName;
		this.auth = auth;
		this.paths = {
			repos: `https://api.github.com/users/${this.organisationName}/repos`,
			stats: `https://api.github.com/repos/${this.organisationName}/%REPO_NAME%/stats/contributors`,
		};
	}

	async makeRequest(path) {
		let res = await fetch(path, { headers: { Authorization: `Basic ${this.auth}` } });
		res = await res.json();
		return res;
	}

	async getAllRepoNames() {
		let res = await this.makeRequest(this.paths.repos);
		return res.map((repo) => repo.name);
	}

	async getRepoStats(repoName) {
		let repo = await this.makeRequest(this.paths.stats.replace("%REPO_NAME%", repoName));
		let contributors = [];
		try {
			for (let contributor of repo) {
				let c = {
					name: contributor.author.login,
					additions: 0,
					deletions: 0,
					realAdditions: 0,
					commits: contributor.total,
					additionsPerCommit: 0,
				};
				for (let week of contributor.weeks) {
					c.additions += week.a;
					c.deletions += week.d;
				}
				c.realAdditions = c.additions - c.deletions;
				c.additionsPerCommit = Math.round(c.additions / c.commits);
				contributors.push(c);
			}
		} catch {
			return contributors;
		}
		return contributors;
	}
	async getOrgStats() {
		const repos = await this.getAllRepoNames();
		let raw_contr = [];
		let contributors = {};
		for (let _repo of repos) {
			let repo = await this.getRepoStats(_repo);
			for (const contr of repo) {
				raw_contr.push(contr);
			}
		}
		for (let con of raw_contr) {
			if (!Object.keys(contributors).includes(con.name)) {
				let { name, ...contr_obj } = con;
				contributors[name] = {
					...contr_obj,
				};
			} else {
				let cont = contributors[con.name];
				cont.additions += con.additions;
				cont.deletions += con.deletions;
				cont.commits += con.commits;
				cont.realAdditions = cont.additions - cont.deletions;
				cont.additionsPerCommit = cont.additions / cont.commits;
			}
		}
		return contributors;
	}
}
module.exports = Github;
