import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const URL_BACKEND = environment.apiURL + 'ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http: HttpClient) { }

  getIngredientsName(): Observable<string[]>{
    return this.http.get<string[]>(URL_BACKEND + "/allNames", {});
  }
}
