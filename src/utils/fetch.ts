const _importDynamic = new Function("modulePath", "return import(modulePath)");

async function fetch(...args: any) {
  const { default: fetch } = await _importDynamic("node-fetch");
  return fetch(...args);
}

const URL = `https://api.thecatapi.com/v1`;

export const fetcher = async (
  endpoint: string,
  payload?: any,
  method = "get",
  _headers?: any
) => {
  const apiKey = process.env.CAT_WIKI_API_KEY!;

  try {
    const res = await (
      await fetch(URL + endpoint, {
        method,
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          // ...headers,
        },
      })
    ).json();

    return res;
  } catch (err) {
    console.error(err);
    return { msg: err };
  }
};
