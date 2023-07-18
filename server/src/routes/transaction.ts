import express from 'express';

import { getTransaction } from '../controllers/transactionController';

const router = express.Router();

router.get('/transactions', getTransaction);

export default router;
