const { port } = require("./config.json");
const total = require("./routes/total");
const Express = require("express");
const db = require("./github/db");
const app = Express();

app.use("/total", total);

function log(content) {
	let d = new Date();
	console.log(
		`[${d.getHours().toString().length < 2 ? "0" + d.getHours().toString() : d.getHours()}:${
			d.getMinutes().toString().length < 2 ? "0" + d.getMinutes().toString() : d.getMinutes()
		}:${d.getSeconds().toString().length < 2 ? "0" + d.getSeconds().toString() : d.getSeconds()}]`,
		content
	);
}

db.init().then(() => {
	log("Connected to db...");
	app.listen(port, () => {
		log(`Server listening at http://localhost:${port}...`);
	});
});
