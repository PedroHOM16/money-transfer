import { Response, Request } from 'express';
import transactionsService from '../services/transactionsService.js';
import usersService from '../services/usersService.js';
import { formatDate } from '../services/utils.js';


const transactionsController = {
    async createTransaction(req: Request, res: Response) {
        const { debitedAccountId, username, value } = req.body;
        const {accountId: creditedAccountId} = await usersService.getAccountIdByUsername(username);
        const data = { debitedAccountId, creditedAccountId, value };
        const transaction = await transactionsService.createTransaction(data);
        await transactionsService.changeAccountBalance({ value, debitedAccountId, creditedAccountId });
        const creditedAccount = await transactionsService.getUserById(transaction.creditedAccountId);
        const debitedAccount = await transactionsService.getUserById(transaction.debitedAccountId);
        const date = formatDate(transaction.createdAt);
        res.status(201).json({
            creditedAccount,
            debitedAccount,
            value,
            date,
        })        
    },
    async getTransactionsById(req: Request, res: Response) {
        const id = req.params;
        const transactions = await transactionsService.getTransactionsById(id);
        console.log('aqui estamos', transactions);       
        res.status(201).json(transactions)
    }
}

export default transactionsController;