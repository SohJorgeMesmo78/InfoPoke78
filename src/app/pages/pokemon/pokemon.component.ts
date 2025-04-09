import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.pokemonId = Number(this.route.snapshot.paramMap.get('id'));
    this.pokemonService.getPokemonById(this.pokemonId).subscribe({
      next: (data) => this.pokemon = data,
      error: (err) => console.error('Erro ao carregar Pokémon:', err),
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
