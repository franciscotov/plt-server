import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import routesRegister from "./sequelize/routes/routesRegister";

const server = express();

let whitelist = [
  "localhost",
  "localhost:3000",
  "localhost:4200",
];
let corsOptions = {
  origin: whitelist,
};

server.use(express.urlencoded({ extended: true, limit: "50mb" }));
// { limit: "50mb", extended: true }
server.use(express.json());
server.use(cookieParser());
server.use(cors(corsOptions));
routesRegister(server);

export { server };
