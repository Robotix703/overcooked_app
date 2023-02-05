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

  getPantries(){
    this.pantrySub = this.pantryService.getPantries().subscribe(data => {
      this.display(data);
    });
  }

  ngOnInit() {
    this.getPantries();
  }

  deletePantry(pantryId: string){
    this.pantryService.deletePantry(pantryId).subscribe(response => {
      this.getPantries();
    });
  }

  updateExpirationDate(expirationDate: string){
    console.log(expirationDate);
  }

  ionViewWillEnter() {
    this.getPantries();
  }

  refresh(){
    this.pantryService.refreshPantry().subscribe(data => {
      this.getPantries();
    });
  }
}
