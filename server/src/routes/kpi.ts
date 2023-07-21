import express from 'express';

import { getKpi } from '../controllers/kpiController';
import { asyncErrorHanlder } from '../utils/asyncErrorHandler';

const router = express.Router();

router.get('/kpis', asyncErrorHanlder(getKpi));

export default router;
