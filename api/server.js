const express = require("express")
const helmet = require("helmet")
const cors = require("cors")

const server = express()

// import routers ************



// import routers ************

server.use(helmet())
server.use(cors())
server.use(express.json())

// routers *******************



// routers *******************

server.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the Anywhere Fitness API!" });
});

module.exports = server;