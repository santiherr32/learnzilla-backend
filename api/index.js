const server = require("../src/app.js");
const { conn } = require("../src/db.js");

// Test the connection with detailed error logging
(async () => {
  try {
    await conn.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    if (error.original) {
      console.error("Original error:", error.original);
    }
  }
})();

module.exports = server;
