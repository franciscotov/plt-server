import { Router } from "express";
import { loginUser, loginUserWithGoogle } from "../services/userService.ts";

const userRouter = Router();
const email = "";
// userRouter.post("/login", login);
userRouter.get("/login", loginUser);
userRouter.post("/login-google", loginUserWithGoogle);

export default userRouter;
