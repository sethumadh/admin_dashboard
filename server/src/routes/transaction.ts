import express from 'express';

import { getTransaction } from '../controllers/transactionController';
import { asyncErrorHanlder } from '../utils/asyncErrorHandler';

const router = express.Router();

router.get('/transactions', asyncErrorHanlder(getTransaction));

export default router;
