import { Router } from "express";

import { createCampus } from "../../services/campusService";

const campusRouter = Router();
campusRouter.post("/create", createCampus);

export default campusRouter;