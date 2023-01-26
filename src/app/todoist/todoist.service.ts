import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DeleteResponse } from '../common.model';
import { TodoItem } from './todoist.model';

const URL_BACKEND = environment.apiURL + 'todoItem';

@Injectable({
  providedIn: 'root'
})
export class TodoistService {

  constructor(private http: HttpClient) { }

  getTodoItems(): Observable<{todoItems: TodoItem[], count: number}>{
    return this.http.get<{todoItems: TodoItem[], count: number}>(URL_BACKEND, {});
  }

  deleteTodoItems(todoItemId: string): Observable<DeleteResponse>{
    return this.http.delete<DeleteResponse>(URL_BACKEND + '/' + todoItemId);
  }
}
