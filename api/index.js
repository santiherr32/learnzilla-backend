const server = require("../src/app.js");
const { conn } = require("../src/db.js");

console.log("Before sync");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log(`%s listening at ${process.env.PORT}`);
});
