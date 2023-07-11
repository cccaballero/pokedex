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
    })
    .catch(error => {
      console.error(error);
    });
};

const getPokemon = (url: string) => {
  return fetch(url)
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      console.error(error);
    });
};

const pokemonService = {
  getPokemons,
  getPokemon,
};

export default pokemonService;
