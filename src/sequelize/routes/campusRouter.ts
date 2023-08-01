import { Router } from "express";

import { createCampus, getCampus, updateCampus } from "../../services/campusService";

const campusRouter = Router();
campusRouter.post("/create", createCampus);
campusRouter.get("/list", getCampus);
campusRouter.put("/update", updateCampus);

export default campusRouter;