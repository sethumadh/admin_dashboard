import express, { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

export const authUser = asyncHandler(async (req: Request, res: Response,next:NextFunction) => {
    res.status(200).json({ message: 'user' });
});
