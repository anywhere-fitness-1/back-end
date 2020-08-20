const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = express();
const authenticate = require("../auth/restricted-middleware.js");

const clientRouter = require("../api/clients/client-router.js");
const instructorRouter = require("../api/instructors/instructor-router.js");
const classRouter = require("../api/classes/class-router.js");
// import routers ************

server.use(helmet());
server.use(cors());
server.use(express.json());

// routers *******************
// server.use here
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/clients", clientRouter);
server.use("/api/instructors", instructorRouter);
// add authenticate below
server.use("/api/classes", classRouter);

// routers *******************

server.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Anywhere Fitness API!" });
});

module.exports = server;
