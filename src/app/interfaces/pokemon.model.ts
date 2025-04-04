export interface TipoPokemon {
    slot: number;
    nome: string;
  }
  
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
    tipos: TipoPokemon[];
    jogos: string[];
    imagens: ImagensPokemon;
  }
  