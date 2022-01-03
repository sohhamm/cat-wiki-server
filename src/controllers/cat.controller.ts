import { fetcher } from "../utils/fetch";
import { Request, Response } from "express";
import { Cat } from "../entities/cat";
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

  let msg = { msg: "cat not found", name: "" };
  // console.log({ mostSearched });

  // const mostSearched = JSON.parse(await readFile("./search.json".toString()));

  // mostSearched.forEach((cat, idx) => {
  //   if (cat.name.toLowerCase().includes(name.toLowerCase())) {
  //     cat.count++;
  //     // updateCount(idx);
  //     msg.msg = "successfully incremented search count";
  //     msg.name = cat.name.toLowerCase();
  //   }
  // });

  return res.json(msg);
};

export const getTopBreeds = async (req: Request, res: Response) => {
  const limit = Number(req.query.limit) || 10;

  const top_cats = await Cat.find({});

  console.log(top_cats);

  return res.json(
    top_cats.sort((a, b) => (a.count > b.count ? -1 : 1)).slice(0, limit + 1)
  );
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
