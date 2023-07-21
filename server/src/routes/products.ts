import express from 'express';

import { getProducts,getOneProduct, addOneproduct } from '../controllers/productsController';
import { asyncErrorHanlder } from '../utils/asyncErrorHandler';

const router = express.Router();


router.get('/products', asyncErrorHanlder(getProducts));
router.get('/:id',  asyncErrorHanlder(getOneProduct))
router.post('/create',asyncErrorHanlder(addOneproduct))

export default router;
