import { Router } from "express";
import { loginUser } from "../../services/userService";

const userRouter = Router();
const email = "";
// userRouter.post("/login", login);
userRouter.get("/login", loginUser);
// authRouter.put('/login/v2/:email', loginV2);
// authRouter.post('/request-change-password', requestChangePassword);
// authRouter.post('/change-password-with-token', changePasswordWithToken);
// authRouter.post('/login/administrator/sso/check', checkLoginSSO);
// authRouter.get('/rest/login/business/unit/default/by/user', getDefaultBUByUser);
// authRouter.put('/login/administrator/:emailOrUsername', loginProfessionalsWithCaptcha);

export default userRouter;
