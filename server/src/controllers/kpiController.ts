import { Request, Response } from "express";
import KPI from "../models/KPI";

export const getKpi= async (req:Request, res:Response) => {
    try {
      const kpis = await KPI.find(); 
      res.status(200).json(kpis);
    } catch (error:any) {
      res.status(404).json({ message: error.message });
    }
  }