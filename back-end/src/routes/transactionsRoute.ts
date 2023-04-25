import { Router } from "express";
import transactionsController from "../controllers/transactionsController.js";

const transactionsRoute = Router();

transactionsRoute.post('/', transactionsController.createTransaction);
transactionsRoute.get('/:id', transactionsController.getTransactionsById);

export default transactionsRoute;