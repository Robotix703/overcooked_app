import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IngredientInventory } from '../pantry.model';
import { PantryService } from '../pantry.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  pantrySub: Subscription;
  ingredients: IngredientInventory[];

  constructor(private pantryService: PantryService) { }

  display(data: IngredientInventory[]){
    this.ingredients = data;
  }

  ngOnInit() {
    this.pantrySub = this.pantryService.getPantries().subscribe(data => {
      this.display(data);
    });
  }

  deletePantry(pantryId: string){
    this.pantryService.deletePantry(pantryId).subscribe(response => {
      this.pantrySub = this.pantryService.getPantries().subscribe(data => {
        this.display(data);
      });
    });
  }

  updateExpirationDate(expirationDate: string){
    console.log(expirationDate);
  }
}
