import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonTable } from '../../interfaces/pokemon.model';
import { Paginacao } from '../../interfaces/paginacao.model';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit {
  paginacao: Paginacao<PokemonTable> = {
    total: 0,
    pagina: 1,
    totalPaginas: 0,
    limite: 10,
    data: []
  };
  
  searchTerm: string = '';
  loading = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(resetPage: boolean = false): void {
    this.loading = true;
  
    if (resetPage) {
      this.paginacao.pagina = 1;
    }
  
    const pagina = this.paginacao?.pagina ?? 1;
    const limite = this.paginacao?.limite ?? 10;
  
    this.pokemonService.getPokemons(pagina, limite, this.searchTerm).subscribe(
      (response: Paginacao<PokemonTable>) => {
        this.paginacao = response;
        this.loading = false;
      },
      (error) => {
        console.error('Erro ao carregar os pokémons:', error);
        this.loading = false;
      }
    );
  }

  onPageChange(event: any): void {
    this.paginacao.pagina = event.pageIndex + 1;
    this.paginacao.limite = event.pageSize;
    this.loadPokemons();
  }
}
