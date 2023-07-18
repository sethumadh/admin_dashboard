import { Request, Response } from 'express';

import Transaction from '../models/Transaction';

export const getTransaction = async (req: Request, res: Response) => {
    try {
        const transactions = await Transaction.find().limit(250).sort({ createdOn: -1 });
        console.log('transaction');
        res.status(200).json(transactions);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};
