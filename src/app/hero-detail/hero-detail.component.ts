import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  //calling @input decorator so that when a user types a value into the text box
  //it will be saved to the hero variable of type Hero. will be used only 
  //when the user types in his input. 
  @Input() hero?:Hero;
  //initiating private route,location and heroService, so they could be used
  //in our methods.  
  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private heroService: HeroService
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    //saves the 'id' param from the url, and calling the heroService- thanks to our constructor.
    // save the return value as this.hero . the subscribe waiting for the Observable<Hero>, which is 
    // the return value of heroService.getHero() method that send a GET request and waits for response.
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero)
  }
  goBack(): void {
    // uses the Location library to navigate 1 step back in the browser. 
    this.location.back();
  }
  updateHero(): void {
    // makes sure the hero has value then uses the heroService updatedHero() method.
    // the subscribe waiting for the Observable<Hero>, which is the return value of heroService.getHero()
    // method that send a GET request and waits for response.
    // TO DO: change the if - at the moment even if there was no change, a put request will
    // be sent to the server. 
    if(this.hero){
      var body = {
        "_id": this.hero._id,
        "name": this.hero.name
      }      
      this.heroService.updateHero(body)
        .subscribe(hero => this.hero= hero)
    }
  }
}
