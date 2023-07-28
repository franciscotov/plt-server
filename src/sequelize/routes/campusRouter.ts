import { Router } from "express";

import { createCampus, getCampus } from "../../services/campusService";

const campusRouter = Router();
campusRouter.post("/create", createCampus);
campusRouter.get("/list", getCampus);

export default campusRouter;