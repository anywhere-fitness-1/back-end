const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authenticate = require("../auth/restricted-middleware.js");

const clientRouter = require("../api/clients/client-router.js");
const instructorRouter = require("../api/instructors/instructor-router.js");
const classRouter = require("../api/classes/class-router.js");
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/clients", clientRouter);
server.use("/api/instructors", instructorRouter);
// add authenticate below
server.use("/api/classes", classRouter);

server.get("/", (req, res) => {
  res.send({
    message: "Server up and/or running",
  });
});

module.exports = server;
