import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../interfaces/pokemon.model';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
  pokemonId!: number;
  pokemon!: Pokemon;
  loading = true;
  fallbackImagem = 'assets/images/jogos/generico.png';

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pokemonId = id;
    this.buscarPokemon(id);
  }
  

  carregarPokemon(id: number): void {
    if (isNaN(id) || id < 1) return;
    this.loading = true;
    this.router.navigate(['/pokemon', id]);
  
    this.buscarPokemon(id)
  }
  

  buscarPokemon(id: number): void {
    this.loading = true;
    this.pokemonService.getPokemonById(id).subscribe({
      next: (data) => {
        this.pokemon = data;
        this.pokemonId = id;
      },
      error: (err) => {
        console.error('Erro ao carregar Pokémon:', err);
        alert('Ocorreu um erro ao buscar o Pokémon.');
        this.loading = false;
      },      
      complete: () => this.loading = false
    });
  }

  getJogoImagem(jogo: string): string {
    return `assets/images/jogos/${jogo}.png`;
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.fallbackImagem;
  }
}
