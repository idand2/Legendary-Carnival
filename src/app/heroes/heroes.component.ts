import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  // initiate the heroes array as an array of Hero type objects. 
  heroes: Hero[] = [];
  //initiating private route,location and heroService, so they could be used
  //in our methods. the messageService can be used to transfer data between unrealated components.  
  constructor(private heroService: HeroService, private messageService:MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    //using heroSerivce.getHeroes() to get a list of all the heroes.
    //saves it using anonymos function to the this.heroes array. 
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
}
