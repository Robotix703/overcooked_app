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
  isLoading: boolean = false;

  constructor(private todoistService: TodoistService) { }

  ngOnInit() {
    this.display();
  }

  display(){
    this.isLoading = true;
    this.todoItemSub = this.todoistService.getTodoItems().subscribe(data => {
      this.todoitems = data.todoItems;
      this.isLoading = false;
    });
  }

  deleteTodoitem(todoItemId: string, slidingEl: IonItemSliding){
    this.isLoading = true;
    this.todoistService.deleteTodoItems(todoItemId).subscribe(response => {
      this.display();
      slidingEl.close();
    });
  }

  ionViewWillEnter() {
    this.display();
  }
}
