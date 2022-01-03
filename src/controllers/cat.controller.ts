import { fetcher } from "../utils/fetch";
import { Request, Response } from "express";

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

// export const getTopBreeds = async (req: Request, res: Response) => {
//   const limit = Number(req.query.limit) || 10;

//   return res.json(
//     mostSearched
//       .sort((a, b) => (a.count > b.count ? -1 : 1))
//       .slice(0, limit + 1)
//   );
// };
