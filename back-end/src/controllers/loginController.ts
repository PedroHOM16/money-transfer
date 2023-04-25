import { Response, Request } from 'express';
import loginService from '../services/loginService.js';
import { throwValidationError } from '../services/utils.js';
// const { Response, Request } = require('express');
// const loginService = require('../services/loginService');


const loginController = {
    async login(req: Request, res: Response) {
        const data = await loginService.validateBodyLogin(req.body);
        const user = await loginService.getByUserOrThrows(data);
        const { password, ...dataUser } = user!;
        const token = await loginService.makeToken({ user });
        res.status(201).json({ ...dataUser, token });
    },
    async validateToken(req: Request, res: Response) {
        const token = await loginService.validateToken(req.headers)        
        const data = await loginService.readToken(token);
        if (!data) throwValidationError();
        res.status(200).json(data);
    }
};
export default loginController;
// module.exports = loginController;