import { fetcher } from "../utils/fetch";
import { Request, Response } from "express";

export const getAllBreeds = async (_req: Request, res: Response) => {
  const data = await fetcher("/breeds");
  return res.json(data);
};
