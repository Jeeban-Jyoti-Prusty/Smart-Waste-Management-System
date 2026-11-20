const app = require("./src/app");
require("dotenv").config();
const ConnectDb = require("./src/db/db.js");
const dns = require("dns");


dns.setServers(["8.8.8.8", "8.8.4.4"]);
ConnectDb();


const port = process.env.PORT;
app.listen(port, () => {
    console.log("Server running on port", port);

})