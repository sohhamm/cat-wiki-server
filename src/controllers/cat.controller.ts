import { fetcher } from "../utils/fetch";
import { Request, Response } from "express";
import { mostSearched } from "../most-searched";

export const getAllBreeds = async (_req: Request, res: Response) => {
  const data = await fetcher("/breeds");
  return res.json(data);
};

export const getSearchedBreeds = async (req: Request, res: Response) => {
  const { q = "" } = req.query;
  const data = await fetcher(`/breeds/search?q=${q}`);
  return res.json(data);
};

export const getBreedByID = async (req: Request, res: Response) => {
  const { id = "" } = req.params;
  const data = await fetcher(
    `/images/search?breed_ids=${id}&limit=8`,
    undefined,
    "get"
  );
  const resp = data[0]?.breeds[0] || {};
  resp.url = data[0]?.url;

  const images = data.map((obj: any) => obj.url);

  return res.json({ data: resp, images });
};

export const incrementSearchCount = async (req: Request, res: Response) => {
  const { name } = req.body;

  let msg = { msg: "Cat not found" };

  mostSearched.forEach((cat) => {
    if (cat.name.toLowerCase().includes(name.toLowerCase())) {
      cat.count++;
      msg.msg = "successfully incremented";
    }
  });

  return res.json(msg);
};

export const getTopBreeds = async (_req: Request, res: Response) => {
  return res.json(mostSearched.sort((a, b) => (a.count > b.count ? -1 : 1)));
};
