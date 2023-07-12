import {BASE_URL} from '@env';

const getPokemons = (data: any) => {
  let url = `${BASE_URL}/pokemon?limit=${data.limit}&offset=0`;
  if (data.next) {
    url = `${BASE_URL}${data.next.replace(BASE_URL, '')}`;
  }
  return fetch(url)
    .then(response => response.json())
    .then(json => {
      return json;
    });
};

const getPokemon = (url: string) => {
  return fetch(url)
    .then(response => response.json())
    .then(json => {
      return json;
    });
};

const getDescription = (url: string) => {
  return fetch(url)
    .then(response => response.json())
    .then(json => {
      return json;
    });
};

const pokemonService = {
  getPokemons,
  getPokemon,
  getDescription,
};

export default pokemonService;
