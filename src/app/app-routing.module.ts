import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';

// creates routes as an array of Routes type objects. 
// each route specifies the url path to the wanted component. 
const routes: Routes = [
  { path: 'heroes', component: HeroesComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: '', redirectTo:'/dashboard', pathMatch: 'full'},
  { path: 'detail/:id', component: HeroDetailComponent}
];

// sets the RouterModule at root level. ("http:\\localhost:3000")
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
// MUST export so that other components can import. 
export class AppRoutingModule { }
