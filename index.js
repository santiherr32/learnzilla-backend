const server = require("../src/app.js");
const { conn } = require("../src/db.js");

server.listen(process.env.PORT, () => {
    console.log(`%s listening at ${process.env.PORT}`);
});
