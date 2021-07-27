import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  // getHeroes(): Observable<Hero[]> {
  //   const heroes = of(HEROES);
  //   return heroes;
  // }
  private heroesUrl= 'http://localhost:3000/all-heroes'
  private heroUrl= 'http://localhost:3000/hero/'
  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(this.heroesUrl);
  }
  getHero(id: number): Observable<Hero> {
    var urlById = this.heroUrl + id 
    // const hero = HEROES.find(h=>h.id === id)!;
    // this.messageService.add(`heroService: fetched hero id=${id}`);
    // return of(hero)
    return this.http.get<Hero>(urlById)
  }
  updateHero(body: any): Observable<Hero> {
    // var updateUrl = this.heroUrl + _id;
    console.log(body, this.heroUrl);
    return this.http.put<Hero>(this.heroUrl, body)
  }


  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
}
