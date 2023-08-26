import { Router } from "express";
import { getList, getListByCampusId, updateList } from "../../services/listService.ts";

const listRouter = Router();
listRouter.get("/list", getList);
listRouter.get("/list-by-campus-id", getListByCampusId);
listRouter.put("/update", updateList);

export default listRouter;