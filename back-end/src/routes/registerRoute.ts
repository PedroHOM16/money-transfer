import { Router } from "express";
import registerController from "../controllers/registerController.js";

const registerRoute = Router();

registerRoute.post('/', registerController.register);

export default registerRoute;