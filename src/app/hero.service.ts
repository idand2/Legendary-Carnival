import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl= 'http://localhost:3000/all-heroes'
  private heroUrl= 'http://localhost:3000/hero/'
  // Obsevable let us wait for the server's response for the fucntion to start.
  getHeroes(): Observable<Hero[]>{
    // uses http to send get request. 
    //<Hero[]> will parse the response to an array of Hero type objects. 
    return this.http.get<Hero[]>(this.heroesUrl);
  }
  getHero(id: number): Observable<Hero> {
    //GET request with a specific id to get a specific hero. according to the API
    var urlById = this.heroUrl + id 
    return this.http.get<Hero>(urlById)
  }
  updateHero(body: any): Observable<Hero> {
    // PUT request to update a record in the server. 
    return this.http.put<Hero>(this.heroUrl, body)
  }

// create a private instance of an HttpClient for the methods to use. 
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
}
