const { MongoDatabase } = require("lambert-db");
const { db: db_str } = require("../config.json");

const db = new MongoDatabase(db_str);
module.exports = db;
