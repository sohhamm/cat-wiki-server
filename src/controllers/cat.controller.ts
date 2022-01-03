import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Cat } from "../entities/cat";
import { fetcher } from "../utils/fetch";
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
  try {
    const { id } = req.body;
    const entityManager = getManager();
    const cat = await entityManager.findOne(Cat, id);
    if (!cat) {
      return res.json({ msg: "cat not found", name: "" });
    }
    cat.count += 1;
    entityManager.save(cat);
    return res.json({ msg: "success", name: cat.name, id: cat.id });
  } catch (err) {
    return res.status(500).json({ msg: "error updating cat from database" });
  }
};

export const getTopBreeds = async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const topCats = await Cat.find({
      order: {
        count: "DESC",
      },
    });
    return res.json(
      topCats.sort((a, b) => (a.count > b.count ? -1 : 1)).slice(0, limit + 1)
    );
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "error getting cats from the database" });
  }
};

export const seedDB = async (_req: Request, res: Response) => {
  for (let obj of mostSearched) {
    const cat = new Cat();
    cat.id = obj.id;
    cat.name = obj.name;
    cat.description = obj.description;
    cat.count = 0;
    cat.url = obj.image?.url || "";
    await cat.save();
  }

  res.json({ msg: "done" });
};
