// src/app/pages/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private pokeService: PokemonService) {}

  ngOnInit(): void {
    
  }

  chamaPoke(){
    console.log("aiaiai")
    this.pokeService.getPokemon('pikachu').subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.error('Erro ao buscar Pokémon', err);
      }
    });
  }
}
