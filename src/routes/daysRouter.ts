import { Router } from "express";

import { getDays } from "../services/daysService.ts";

const daysRouter = Router();
daysRouter.get("/list", getDays);

export default daysRouter;
