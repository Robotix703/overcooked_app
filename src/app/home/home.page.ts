import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe/recipe.model';
import { RecipeService } from '../recipe/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  recipeSub: Subscription;
  recipes: Recipe[];

  constructor(private recipeService: RecipeService) {}

  display(data: Recipe[]){
    this.recipes = data;
  }

  ngOnInit() {
    this.recipeSub = this.recipeService.getRecipes().subscribe(data => {
      this.display(data.recipes);
    });
  }

  onIonInfinite(ev) {
    //TODO - Update limitedList

    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  createMeal(recipeId: string){

  }
}
