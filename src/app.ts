import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
const serverless = require("serverless-http");
import cors from "cors";
import routesRegister from "./sequelize/routes/routesRegister";

const router = express.Router();
const server = express();

let whitelist = ["localhost", "localhost:3000", "localhost:4200"];
let corsOptions = {
  origin: whitelist,
};

server.use(express.urlencoded({ extended: true, limit: "50mb" }));
// { limit: "50mb", extended: true }
server.use(express.json());
server.use(cookieParser());
server.use(cors(corsOptions));

router.get("/", (_req, res) => {
  res.send("App is running...");
});

routesRegister(router);
// server.use(router)

server.use("/.netlify/functions/api", router);
module.exports.handler = serverless(server);

export { server };
