import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PrettyInstruction, Recipe } from './recipe.model';

const URL_BACKEND = environment.apiURL + 'recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  getRecipes(category: string, name: string, tags: string[], sort: string): Observable<{recipes: Recipe[], count: number}>{
    let tagsAsString: string = JSON.stringify(tags);
    return this.http.get<{recipes: Recipe[], count: number}>(URL_BACKEND + `/filter?category=${category}&name=${name}&tags=${tagsAsString}&sort=${sort}`, {});
  }

  getRecipe(recipeId: string): Observable<Recipe>{
    return this.http.get<Recipe>(URL_BACKEND + '/byID?recipeID=' + recipeId, {});
  }

  getInstructions(recipeId: string): Observable<PrettyInstruction[]>{
    return this.http.get<PrettyInstruction[]>(URL_BACKEND + '/instructions?recipeID=' + recipeId, {});
  }

  editRecipeDescription(recipeId: string, recipeTitle: string, recipeNumberOfLunch: number, recipeCategory: string, recipeDuration: number){
    return this.http.put(URL_BACKEND + '/' + recipeId, {
      title: recipeTitle,
      numberOfLunch: recipeNumberOfLunch,
      category: recipeCategory,
      duration: recipeDuration
    });
  }
}
