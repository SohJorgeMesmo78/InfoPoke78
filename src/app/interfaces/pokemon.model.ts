export interface ImagensPokemon {
  padrao: string;
  costas: string;
  shiny: string;
  shinyCostas: string;
  oficial: string;
  dreamWorld: string;
}

export interface PokemonTable {
  id: number;
  nome: string;
  peso: number;
  altura: number;
  experiencia: number;
  inicial: boolean;
  tipos: any[];
  jogos: string[];
  imagens: ImagensPokemon;
}

export interface Pokemon {
  id: number;
  nome: string;
  peso: number;
  altura: number;
  experiencia: number;
  inicial: boolean;
  tipos: any[];
  jogos: string[];
  imagens: ImagensPokemon;
}