import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  heroes: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroService) {}

  getHeroes(): void {
    // getHeroes returns the Observable<Hero[]>,
    // you do .subscribe to unwrap the Observable shell over the Hero[]
    // subscribe takes a function (callback)in its params
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
    // .subscribe(function(heroes){this.heroes = heroes})
  }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
