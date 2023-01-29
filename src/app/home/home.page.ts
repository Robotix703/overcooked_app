import { Component, OnInit } from '@angular/core';
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
  limitedRecipes: Recipe[];
  pageCount: number = 0;
  pageSize: number = 15;

  constructor(private recipeService: RecipeService) {}

  display(data: Recipe[]){
    this.recipes = data;
    console.log(this.recipes)
  }

  ngOnInit() {
    this.recipeSub = this.recipeService.getRecipes().subscribe(data => {
      this.display(data.recipes);
    });
  }

  createMeal(recipeId: string){

  }
}
