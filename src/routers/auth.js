import { Router } from "express";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema } from "../validation/auth.js";
import { registerUserController, requestResetEmailController } from "../controllers/auth.js";
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema } from "../validation/auth.js";
import { loginUserController } from "../controllers/auth.js";
import { logoutUserController } from "../controllers/auth.js";
import { refreshUserSessionController } from "../controllers/auth.js";
import { requestResetEmailSchema } from "../validation/resetEmailSchema.js";
// import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router.post('/register', validateBody(registerUserSchema), registerUserController);

router.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh',  ctrlWrapper(refreshUserSessionController));

router.post('/request-reset-email', validateBody(requestResetEmailSchema), ctrlWrapper(requestResetEmailController));

export default router;