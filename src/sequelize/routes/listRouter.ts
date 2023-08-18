import { Router } from "express";
import { getList, updateList } from "../../services/listService";

const listRouter = Router();
listRouter.post("/list", getList);
listRouter.put("/update", updateList);

export default listRouter;