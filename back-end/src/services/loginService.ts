import Joi from 'joi';
import Jwt from 'jsonwebtoken';
import fs from 'fs';
import md5 from 'md5';
import Users from '../database/models/usersModel.js';
import { throwUnauthorizedError, throwNotFoundError } from './utils.js'

const secret = fs.readFileSync('jwt.evaluation.key', { encoding: 'utf-8' });

const loginService = {
    async validateBodyLogin(body: Object) {
        const schema = Joi.object({
            username: Joi.string().required().max(255),
            password: Joi.string().required().min(8),
        });
        const data = await schema.validateAsync(body);
        return data;
    },
    async validateToken(headers: any) {
        const { authorization } = headers;
        if (!authorization) throwUnauthorizedError('Token not found');
        let token = '';
        if (authorization.split(' ').length > 1) [, token] = authorization.split(' ');
        else token = authorization;
        return token;
    },
    async makeToken(data: any) {
        const token = Jwt.sign({ data }, secret, { algorithm: 'HS256', expiresIn: '24h' });
        return token;
    },
    async readToken(token: any) {
        try {
            const data = Jwt.verify(token, secret);           
            return data;
        } catch (error) {
            throwUnauthorizedError('Expired or invalid token');
        }
    },
    async getByUserOrThrows(data: any) {
        const { username, password } = data;
        const user = await Users.findOne({
            where: { username },
            raw: true,
        });
        if (!user) throwNotFoundError();
        if (md5(password) !== user!.password) throwNotFoundError();
        return user;
    },
};

export default loginService;
