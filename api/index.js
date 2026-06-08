import server from "../src/app.js";
import { conn } from "../src/db.js";

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

export default server;
