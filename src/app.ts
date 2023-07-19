import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import routesRegister from "./sequelize/routes/routesRegister";

const server = express();

let whitelist = [
  "https://dev.proveedores.tutenlabs.dev",
  "https://qa.proveedores.tutenlabs.dev",
  "https://uat.proveedores.tutenlabs.dev",
  "https://proveedores.labs.tutenlabs.dev",
  "https://proveedores.learn.tutenlabs.dev",
  "https://proveedores.tutenlabs.com",
  "https://dev.pro.tutenlabs.dev",
  "https://qa.pro.tutenlabs.dev",
  "https://uat.pro.tutenlabs.dev",
  "https://pro.labs.tutenlabs.com",
  "https://pro.learn.tutenlabs.com",
  "https://pro.tutenlabs.com",
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
