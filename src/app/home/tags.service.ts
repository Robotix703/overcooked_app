import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tag } from './tag.model';

const URL_BACKEND = environment.apiURL + 'tag';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http: HttpClient) { }

  getTags(): Observable<Tag[]>{
    return this.http.get<Tag[]>(URL_BACKEND, {});
  }
}
