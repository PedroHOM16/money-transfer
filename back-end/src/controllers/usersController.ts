import usersService from "../services/usersService.js";
import { Request, Response } from "express";
import loginService from "../services/loginService.js";
import { throwValidationError } from "../services/utils.js";

const usersController = {
    async homePage(req: Request, res: Response): Promise<any> {
        const token = await loginService.validateToken(req.headers);
        if (!token) throwValidationError();
        const data = await loginService.readToken(token);
        const { username, accountId } = await usersService.getUserById(data);
        const balance = await usersService.getUserBalance(accountId);
        res.status(201).json({ username, balance });        
    },
    async getUserById(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const { username } = await usersService.getNames(+id);
        res.status(201).json(username);
    },
    async getBalanceById(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const balance = await usersService.getUserBalance(+id);
        res.status(201).json(balance);
    },
    async getAllUsersNames(req: Request, res: Response): Promise<any> {
        const usernames = await usersService.getAllUsersName();
        let responseArray: any = [];
        usernames.map((username: any) => {
            responseArray.push(username.username)
        })
        console.log(responseArray);
        res.status(200).json(responseArray);
    }
}

export default usersController;
