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
  searchName: string = "";
  categorySelected: string = "Plat";

  constructor(private recipeService: RecipeService) {}

  display(data: Recipe[]){
    this.recipes = data;
    console.log(this.recipes)
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

  createMeal(recipeId: string){

  }
}
