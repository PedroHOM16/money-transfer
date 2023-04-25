import { NOW } from "sequelize";
import Accounts from "../database/models/accountsModel.js";
import Transactions from "../database/models/transactionsModel.js";
import Users from "../database/models/usersModel.js";
import Transaction from "../interfaces/transactionsInterface.js";
import { throwNotFoundError } from "./utils.js";

const transactionsService = {
    async getUserById(id: number): Promise<any> {
        const response = await Users.findByPk(id, {
            raw: true,
            attributes: { exclude: ['password', 'id', ]}
        });
        if (!response) throwNotFoundError();
        return response!;
    },
    async createTransaction({ debitedAccountId, creditedAccountId, value }: Transaction): Promise<any> {
        const payload = {
            debitedAccountId,
            creditedAccountId,
            value,
        };
        const { dataValues } = await Transactions.create(payload, { raw: true });
        return dataValues;
    },
    async changeAccountBalance({ value, debitedAccountId, creditedAccountId }: any): Promise<any> {
        const debitedAccount = await Accounts.findOne({
            where: { id: debitedAccountId },
            raw: true,
        });
        const creditedAccount = await Accounts.findOne({
            where: { id: creditedAccountId },
            raw: true,
        });
        const newBalanceD = +debitedAccount!.balance - +value;
        const newBalanceC = +creditedAccount!.balance + +value;
        await Accounts.update({ balance: newBalanceD }, {
            where: { id: debitedAccountId },
        });
        await Accounts.update({ balance: newBalanceC }, {
            where: { id: creditedAccountId },
        })
    },
    async getTransactionsById(id: any): Promise<any> {
        const { id: accountId } = id;
        const debTransactions = await Transactions.findAll({
            where: { debitedAccountId: accountId },
            raw: true,
        });        
        const credTransactions = await Transactions.findAll({
            where: { creditedAccountId: accountId },
            raw: true,
        });
        const payload = {
            debTransactions,
            credTransactions,
        };        
        return payload;
    }
}

export default transactionsService;