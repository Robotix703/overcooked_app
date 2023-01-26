import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { TodoItem } from '../todoist.model';
import { TodoistService } from '../todoist.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  todoItemSub: Subscription;
  todoitems: TodoItem[];

  constructor(private todoistService: TodoistService) { }

  ngOnInit() {
    this.todoItemSub = this.todoistService.getTodoItems().subscribe(data => {
      this.todoitems = data.todoItems;
    });
  }

  deleteTodoitem(todoItemId: string, slidingEl: IonItemSliding){
    this.todoistService.deleteTodoItems(todoItemId).subscribe(response => {
      this.todoItemSub = this.todoistService.getTodoItems().subscribe(data => {
        this.todoitems = data.todoItems;
      });
      slidingEl.close();
    });
  }
}
