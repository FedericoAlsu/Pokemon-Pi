///
//
//
/*const options = {
  name: "charmander",
  orderBy: "name",
  orderDir: "asc",
}*/

export async function getAllPokemon(options) {
  let response = await fetch(
    "http://localhost:3001/pokemons?" + new URLSearchParams(options)
  );
  let data = await response.json();
  return data;
}

export async function getOnePokemon(id) {
  let response = await fetch("http://localhost:3001/pokemons/" + id);
  let data = await response.json();
  return data;
}

export async function createPokemon(data) {
  let response = await fetch("http://localhost:3001/pokemons/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function getAllTypes() {
  let response = await fetch("http://localhost:3001/types");
  let data = await response.json();
  return data;
}

export async function getRandomPokemon() {
  let response = await fetch("http://localhost:3001/pokemons/random");
  let data = await response.json();
  return data;
}
