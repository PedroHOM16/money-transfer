import { Router } from "express";
import loginController from "../controllers/loginController.js";

const loginRoute = Router();

loginRoute.post('/', loginController.login);
loginRoute.get('/validate', loginController.validateToken);

export default loginRoute;
