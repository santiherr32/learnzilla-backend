const server = require("../src/app.js");
const { conn } = require("../src/db.js");

// Syncing all the models at once.
conn.sync({ force: true })
  .then(() => console.log("SYNC COMPLETE"))
  .catch(err => console.error("SYNC ERROR", err));

module.exports = server;
