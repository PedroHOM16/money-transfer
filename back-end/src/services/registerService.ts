import { throwConflictError } from './utils.js';
import Users from '../database/models/usersModel.js';
import md5 from 'md5';
import Joi from 'joi';
import User from '../interfaces/usersInterface.js';
import Accounts from '../database/models/accountsModel.js';



const registerService = {
  async validateBodyRegister(body: any) {
    const schema = Joi.object({
      username: Joi.string().required().min(3).message('o nome deve conter ao menos três caracteres.'),
      password: Joi.string()
        .required()
        .min(8).message('A senha deve conter 8 caracteres, com ao menos uma letra maiúscula e um número.')
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).message('A senha deve conter ao menos uma letra maiúscula e um número.'),
    });
    const data = await schema.validateAsync(body);
    return data;
  },
  async getByUserOrThrows(data: any) {
      const { username } = data;
      const userName = await Users.findOne({
        where: { username },
        raw: true,
      });
      if (userName) throwConflictError('Nome já cadastrado');
  },
  async createUser({ username, password, accountId }: User) {
      const payload = {
        username,
        password: md5(password),
        accountId,
      };
      const { dataValues } = await Users.create(payload, { raw: true });
      return dataValues;
  },
  async createAccount() {
    const payload = {
        balance: 100,
    }
    const { dataValues } = await Accounts.create(payload, { raw: true });
    return dataValues;
  }
};

export default registerService;