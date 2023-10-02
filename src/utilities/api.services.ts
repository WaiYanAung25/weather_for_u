import { env } from "process";

const GEO_API_OPTIONS = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "e09ddd38c7msh3014e6bc7479bddp1eb925jsnaf3690d15715",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};
export async function fetchCities(input: string) {
  try {
    const response = await fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=10000&namePrefix=${input}`,
      GEO_API_OPTIONS
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}
