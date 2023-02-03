import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeleteResponse } from '../common.model';
import { DisplayableMealStatus } from './meal.model';

const URL_BACKEND = environment.apiURL + 'meal';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  constructor(private http: HttpClient) { }

  getMeals(): Observable<DisplayableMealStatus[]>{
    return this.http.get<DisplayableMealStatus[]>(URL_BACKEND + "/displayable", {});
  }

  deleteMeal(mealId: string): Observable<DeleteResponse>{
    return this.http.delete<DeleteResponse>(URL_BACKEND + '/' + mealId);
  }

  createMeal(recipeId: string) {
    return this.http.post<any>(URL_BACKEND, { recipeID: recipeId });
  }

  consumeMealByRecipe(recipeId: string){
    return this.http.post<any>(URL_BACKEND + "/consume", { recipeID: recipeId });
  }

  consumeMeal(mealId: string){
    return this.http.post<any>(URL_BACKEND + "/consume", { mealID: mealId });
  }

  checkMealByRecipe(recipeId: string){
    return this.http.get<any>(URL_BACKEND + "/byRecipeId?recipeID=" + recipeId, {});
  }
}
