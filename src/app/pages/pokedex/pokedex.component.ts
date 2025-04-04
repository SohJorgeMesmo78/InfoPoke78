import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonTable } from '../../interfaces/pokemon.model';
import { Paginacao } from '../../interfaces/paginacao.model';
import { TipoService } from '../../services/tipo.service';
import { Tipo } from '../../interfaces/tipo.model';

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
  selectedTipos: string[] = [];
  showFilters: boolean = false;
  loading = false;
  shiny = false;
  
  tiposDisponiveis: Tipo[] = [];
  
  constructor(
    private pokemonService: PokemonService,
    private tipoService: TipoService
  ) {}

  ngOnInit(): void {
    this.getGridPokemon();
    this.getTipos();
  }

  toggleFilter(): void {
    this.showFilters = !this.showFilters;
  }

  toggleTipo(tipo: string): void {
    if (this.selectedTipos.includes(tipo)) {
      this.selectedTipos = this.selectedTipos.filter(t => t !== tipo);
    } else {
      this.selectedTipos.push(tipo);
    }
    this.getGridPokemon(true);
  }

  getGridPokemon(resetPage: boolean = false): void {
    this.loading = true;

    if (resetPage) {
      this.paginacao.pagina = 1;
    }

    const pagina = this.paginacao.pagina ?? 1;
    const limite = this.paginacao.limite ?? 10;

    this.pokemonService.getPokemons(pagina, limite, this.searchTerm, this.selectedTipos).subscribe(
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

  getTipos(): void {
    this.tipoService.getTipos().subscribe(
      (tipos) => {
        this.tiposDisponiveis = tipos;
        console.log(tipos)
      },
      (error) => {
        console.error('Erro ao carregar tipos:', error);
      }
    );
  }

  limparFiltros() {
    this.selectedTipos = [];
    this.searchTerm = '';
    this.getGridPokemon(true);
  }
  

  onPageChange(event: any): void {
    this.paginacao.pagina = event.pageIndex + 1;
    this.paginacao.limite = event.pageSize;
    this.getGridPokemon();
  }
}
