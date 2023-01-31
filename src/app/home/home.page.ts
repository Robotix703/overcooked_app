import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { MealService } from '../meal/meal.service';
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
  searchName: string = "";
  categorySelected: string = "Plat";
  isLoading: boolean = false;

  constructor(private recipeService: RecipeService, private mealService: MealService) {}

  display(data: Recipe[]){
    this.recipes = data;
  }

  search(event: any){
    this.searchName = event.detail.value;
    this.getRecipes();
  }

  selectCategory(event: any){
    this.categorySelected = event.detail.value;
    this.getRecipes();
  }

  getRecipes(){
    this.recipeSub = this.recipeService.getRecipes(this.categorySelected, this.searchName).subscribe(data => {
      this.display(data.recipes);
    });
  }

  ngOnInit() {
    this.getRecipes();
  }

  createMeal(recipeId: string, slidingEl: IonItemSliding ){
    this.isLoading = true;
    this.mealService.createMeal(recipeId).subscribe(data => {
      this.isLoading = false;
      slidingEl.close();
      this.getRecipes();
    });
  }
}
