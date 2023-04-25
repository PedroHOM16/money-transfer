import { Router } from "express";
import usersController from "../controllers/usersController.js";

const usersRoute = Router();

usersRoute.get('/', usersController.homePage);
usersRoute.get('/names', usersController.getAllUsersNames);
usersRoute.get('/:id', usersController.getUserById);
usersRoute.get('/balance/:id', usersController.getBalanceById);

export default usersRoute;