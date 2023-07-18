import express from 'express';


import { getKpi } from '../controllers/kpiController';

const router = express.Router();

router.get('/kpis', getKpi);

export default router;
