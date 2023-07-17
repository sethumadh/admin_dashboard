import express from 'express';
import Transaction from '../models/Transaction';

const router = express.Router();

router.get('/transactions', async (req, res) => {
    try {
        const transactions = await Transaction.find().limit(250).sort({ createdOn: -1 });
        console.log('transaction')
        res.status(200).json(transactions);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
});

export default router;
