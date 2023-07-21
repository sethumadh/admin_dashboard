import express, { Request, Response } from 'express';

import { authUser } from '../controllers/userController';

const router = express.Router();

router.get('/auth', authUser);

export default router;
