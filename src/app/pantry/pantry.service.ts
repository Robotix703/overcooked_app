import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DeleteResponse } from '../common.model';
import { PrettyPantry } from './pantry.model';

const URL_BACKEND = environment.apiURL + 'pantry';

@Injectable({
  providedIn: 'root'
})
export class PantryService {

  constructor(private http: HttpClient) { }

  getPantries(): Observable<PrettyPantry[]>{
    return this.http.get<PrettyPantry[]>(URL_BACKEND + "/prettyPantries", {});
  }

  deletePantry(pantryId: string): Observable<DeleteResponse>{
    return this.http.delete<DeleteResponse>(URL_BACKEND + '/' + pantryId);
  }
}
