import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

// @Injectable->this shows angular that it is part of the 'dependency injection' system
// @Injectable takes a metadata object just like @Component did
@Injectable({
  providedIn: 'root'
})

export class HeroService {

  constructor(
    private http: HttpClient,
    private messageServices: MessageService

  ) { }

  private heroesUrl = 'api/heroes';

  // QUESTION: Why is there no return type?
  private log(message: string) {
    this.messageServices.add('HeroService: ' + message);
  }

  // QUESTION: whats 'result?: T'
  private handleError<T> (operation = 'operation', result?: T) {
    // I need and explanation of this syntax
    return (error: any): Observable<T> => {

      console.error(error);

      // BackTick and $ syntax
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);

    };
  }


  // This returns the HEROES array immediately, in a synchronous way
  // this would not work in the real world, when pulling from a server
  // which is inherently asynchronous, so we need a way to fix this, some possible options are:
  // It can take a callback. It could return a Promise. It could return an Observable.
  // For this we will return an observable
  // getHeroes(): Hero[] { // Old, synchronous function
  //   return HEROES;
  // }
  // Observable is used when taking data from an asynchronous source, like a server
  getHeroes(): Observable<Hero[]> {
    this.messageServices.add('HeroService: heroes fetched');
    // The get<Hero[]> portion of this return statement,
    // specifies that from the 'untyped JSON' you will receive as a response to the get request
    // to only show you what has a type of Hero[]
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        // Still don't understand tap
        tap(heroes => this.log('fetched heroes')),
        catchError(this.handleError('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero> {
    // Back Ticks indicate a 'super string'
    // you use ${} to indicate TypeScript

    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      // the _ is a place holder to indicate
      // to the reader of the code that this function
      // doesn't take args, you can also
      // leave it blank, instead of the _
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  // POSTs a hero to the server
  addHero(hero: Hero): Observable<Hero> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }
  deleteHero(hero: Hero | number): Observable<Hero> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    // QUESTION: Shouldn't hero : hero.id be switched
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deletedHero'))
    );
  }
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    // The ?name= is how you query the server for the name
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );

  }





}

// We have to make this HeroService available to the dependency injector system,
// Before Angular can inject it into the HeroComponents.
// We do this by registering a provider. A provider is something that can create or deliver a service;
// in this case, it instantiates the HeroService class to provide the service.
