import { Request, Response } from "express";

import Product from "../models/Product";

export const getProducts= async (req:Request, res:Response) => {
    try {
      const products = await Product.find(); 
      res.status(200).json(products);
    } catch (error:any) {
      res.status(404).json({ message: error.message });
    }
  }