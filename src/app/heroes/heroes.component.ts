import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

//Always export the component class so you can
  // import it elsewhere ... like in the AppModule.
export class HeroesComponent implements OnInit {

  hero: Hero = {
      id: 1,
      name: 'Windstorm'
  };

  constructor() {
  }

  // The ngOnInit is a lifecycle hook Angular calls ngOnInit shortly after
    // creating a component. It's a good place to put initialization logic.
  ngOnInit() {
  }

}