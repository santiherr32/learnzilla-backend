const server = require("../src/app.js");
const { conn } = require("../src/db.js");

console.log("Before sync");

(async () => {
  try {
    console.log("Starting sync");
    await conn.sync({ force: true, logging: console.log});
    console.log("SYNC COMPLETE");
  } catch (err) {
    console.error("SYNC ERROR", err);
  }
})();

module.exports = server;
