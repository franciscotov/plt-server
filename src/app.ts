import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

const server = express();

server.use(express.urlencoded({ extended: true, limit: "50mb" }));
// { limit: "50mb", extended: true }
server.use(express.json());
server.use(cookieParser());
server.use(cors());

export { server };
