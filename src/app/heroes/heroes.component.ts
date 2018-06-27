import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  heroes: Hero[];

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    // getHeroes returns the Observable<Hero[]>,
    // you do .subscribe to unwrap the Observable shell over the Hero[]
    // subscribe takes a function (callback)in its params
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
    // .subscribe(function(heroes){this.heroes = heroes})
  }

  add(name: string): void {
    // trim removes unnecessary white space from a string
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    // Why must it subscribe
    this.heroService.deleteHero(hero).subscribe();
  }
}
