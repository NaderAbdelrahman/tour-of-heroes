import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';


// @Injectable->this shows angular that it is part of the 'dependency injection' system
// @Injectable takes a metadata object just like @Component did
@Injectable({
  providedIn: 'root'
})

export class HeroService {

  constructor(private messageServices: MessageService) { }

  // This returns the HEROES array immediately, in a synchronous way
  // this would not work in the real world, when pulling from a server
  // which is inherently asynchronous, so we need a way to fix this, some possible options are:
  // It can take a callback. It could return a Promise. It could return an Observable.
  // For this we will return an observable
  // getHeroes(): Hero[] { // Old, synchronous function
  //   return HEROES;
  // }
  // Observable is used when taking data from an asyncronous source, like a server
  getHeroes(): Observable<Hero[]> {
    this.messageServices.add('HeroService: heroes fetched');
    return of(HEROES);
  }



}

// We have to make this HeroService available to the dependency injector system,
// Before Angular can inject it into the HeroComponents.
// We do this by registering a provider. A provider is something that can create or deliver a service;
// in this case, it instantiates the HeroService class to provide the service.
