const server = require("../src/app.js");

server.listen(process.env.PORT, () => {
    console.log(`%s listening at ${process.env.PORT}`);
});
