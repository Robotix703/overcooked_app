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
}
