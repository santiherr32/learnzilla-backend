const server = require("../src/app.js");
const { conn } = require("../src/db.js");

// Syncing all the models at once.
await conn.sync({ force: true });

module.exports = server;
