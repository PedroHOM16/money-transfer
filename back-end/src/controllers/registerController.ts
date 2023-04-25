import loginService from '../services/loginService.js';
import registerService from '../services/registerService.js';
import { Response, Request } from 'express';


const registerController = {
  async register(req: Request, res: Response) {
    const data = await registerService.validateBodyRegister(req.body);
    await registerService.getByUserOrThrows(data);
    const account = await registerService.createAccount()
    const { id: accountId } = account;
    const payload = { ...data, accountId }
    const user = await registerService.createUser(payload);
    const { password, id, ...dataUser } = user;
    const token = await loginService.makeToken({ user });
    res.status(201).json({ ...dataUser, token });
  },
};

export default registerController;