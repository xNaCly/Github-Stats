const { port } = require("./config.json");

const total = require("./routes/total");
const login = require("./routes/login");
const user = require("./routes/user");

const Express = require("express");
const cors = require("cors");
const db = require("./github/db");
const app = Express();

app.use(cors());

app.use("/total", total);
app.use("/login", login);
app.use("/user", user);

function log(content) {
	let d = new Date();
	console.log(
		`[${
			d.getHours().toString().length < 2
				? "0" + d.getHours().toString()
				: d.getHours()
		}:${
			d.getMinutes().toString().length < 2
				? "0" + d.getMinutes().toString()
				: d.getMinutes()
		}:${
			d.getSeconds().toString().length < 2
				? "0" + d.getSeconds().toString()
				: d.getSeconds()
		}]`,
		content
	);
}

db.init().then(() => {
	log("Connected to db...");
	app.listen(port, () => {
		log(`Server listening at http://localhost:${port}...`);
	});
});
