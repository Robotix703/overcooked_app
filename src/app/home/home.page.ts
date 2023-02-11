import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { MealService } from '../meal/meal.service';
import { PrettyRecipe, Recipe } from '../recipe/recipe.model';
import { RecipeService } from '../recipe/recipe.service';
import { Tag } from './tag.model';
import { TagsService } from './tags.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  recipeSub: Subscription;
  tagsSub: Subscription;
  recipes: PrettyRecipe[];
  pageCount: number = 0;
  pageSize: number = 15;
  searchName: string = "";
  categorySelected: string = "Plat";
  isLoading: boolean = false;
  tags: Tag[] = [];

  constructor(
    private recipeService: RecipeService, 
    private mealService: MealService,
    private tagService: TagsService
    ) {}

  display(recipes: Recipe[]){
    this.recipes = [];

    for(let recipe of recipes){
      let tags: Tag[] = [];
      
      if(recipe.tags && this.tags){
        for(let tag of recipe.tags){
          tags.push(this.tags.find(e => e._id === tag));
        }
      }
      
      this.recipes.push({
        _id: recipe._id,
        title: recipe.title,
        numberOfLunch: recipe.numberOfLunch,
        imagePath: recipe.imagePath,
        category: recipe.category,
        duration: recipe.duration,
        lastCooked: recipe.lastCooked,
        composition: recipe.composition,
        tags: tags
      });
    }
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

  getTags(){
    this.tagsSub = this.tagService.getTags().subscribe(data => {
      this.tags = data;
    });
  }

  async ngOnInit() {
    await this.getTags();
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
