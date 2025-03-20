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
}
