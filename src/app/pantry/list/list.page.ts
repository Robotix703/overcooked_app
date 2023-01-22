import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PrettyPantry } from '../pantry.model';
import { PantryService } from '../pantry.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  pantrySub: Subscription;
  pantries: PrettyPantry[];

  constructor(private pantryService: PantryService) { }

  display(data: PrettyPantry[]){
    this.pantries = data;
  }

  ngOnInit() {
    this.pantrySub = this.pantryService.getPantries().subscribe(data => {
      this.display(data);
    });
  }

  deletePantry(pantryId: string, slidingEl: IonItemSliding){
    this.pantryService.deletePantry(pantryId).subscribe(response => {
      this.pantrySub = this.pantryService.getPantries().subscribe(data => {
        this.display(data);
      });
      slidingEl.close();
    });
  }

  updateExpirationDate(expirationDate: string){
    console.log(expirationDate);
  }
}
