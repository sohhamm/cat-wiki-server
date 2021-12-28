import { fetcher } from "../utils/fetch";
import { Request, Response } from "express";

export const getAllBreeds = async (_req: Request, res: Response) => {
  const data = await fetcher("/breeds");
  return res.json(data);
};

export const getSearchedBreeds = async (req: Request, res: Response) => {
  const query = req.query.q || "";
  const data = await fetcher(`/breeds/search?q=${query}`);
  return res.json(data);
};

export const getBreedByID = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await fetcher(`/images/search?breed_ids=${id}`);
  return res.json(data);
};
