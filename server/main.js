const { port } = require("./config.json");
const total = require("./routes/total");
const Express = require("express");
const db = require("./github/db");
const app = Express();

app.use("/total", total);

db.init().then(() => {
	console.log("connected to db...");
	app.listen(port, () => {
		console.log(`Server listening at http://localhost:${port}...`);
	});
});
