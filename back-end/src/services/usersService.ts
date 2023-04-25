import Accounts from "../database/models/accountsModel.js";
import Users from "../database/models/usersModel.js";
import User from "../interfaces/usersInterface.js";
import { throwNotFoundError } from "./utils.js";

const usersService = {
    async getUserById(data: any): Promise<User> {
        const { user: { id } } = data.data;        
        const response = await Users.findByPk(id, {
            raw: true,
            attributes: { exclude: ['password', 'id', ]}
        });   
        if (!response) throwNotFoundError();
        return response!;
    },
    async getUserBalance(accountId: number): Promise<any> {
        const data = await Accounts.findByPk(accountId, { raw: true })
        return data!.balance;
    },
    async getNames(id:number): Promise<any> {
        const response = await Users.findByPk(id, {
            raw: true,
            attributes: { exclude: ['password', 'id', ]}
        });
        if (!response) throwNotFoundError();
        return response!;
    },
    async getAccountIdByUsername(username: string): Promise<any> {
        const accountId = await Users.findOne({
            where: {username},
            raw: true,
        });        
        return accountId;
    },
    async getAllUsersName(): Promise<any> {
        const usersNames = await Users.findAll({
            raw: true,
            attributes: { exclude: ['password', 'id', 'accountId'] },
        });
        return usersNames;
    }
}

export default usersService;