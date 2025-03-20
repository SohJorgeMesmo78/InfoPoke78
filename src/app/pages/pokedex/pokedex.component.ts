import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {
  pokemons: any[] = [];
  filteredPokemons: any[] = [];
  paginatedPokemons: any[] = [];
  loading = false;
  searchTerm: string = '';

  // Configuração de paginação
  pageSize: number = 20;
  pageIndex: number = 0;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    if (this.loading) return;
    this.loading = true;

    this.pokemonService.getPokemons(0, 10000).subscribe((data: any) => {
      const allPokemons = data.results.map((pokemon: any) => ({
        name: pokemon.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`
      }));
      console.log(data)
      
      this.pokemons = allPokemons;
      this.filteredPokemons = this.pokemons;
      this.applyPagination();
      this.loading = false;
    });
  }

  filterPokemons() {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    this.filteredPokemons = this.pokemons.filter(pokemon => 
      pokemon.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
    this.pageIndex = 0;
    this.applyPagination();
  }

  applyPagination() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedPokemons = this.filteredPokemons.slice(startIndex, endIndex);
  }

  onPageChange(event: { pageIndex: number, pageSize: number }) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyPagination();
  }

  camelCase(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}
