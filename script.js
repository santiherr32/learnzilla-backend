const { conn } = require("./src/db");

(async () => {
  try {
    console.log("Starting sync");
    await conn.sync({ force: true, logging: console.log });
    console.log("Sync complete");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
