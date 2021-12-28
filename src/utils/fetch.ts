import fetch from "node-fetch";

const URL = `https://api.thecatapi.com/v1`;
export const fetcher = async (
  method = "get",
  endpoint: string,
  payload: JSON
) => {
  try {
    const res = await (
      await fetch(URL + endpoint, {
        method,
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();

    return res;
  } catch (err) {
    console.error(err);
    return { msg: err };
  }
};
