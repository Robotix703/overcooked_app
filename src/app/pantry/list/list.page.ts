import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IngredientInventory } from '../pantry.model';
import { PantryService } from '../pantry.service';
import { AlertController, AlertInput } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  pantrySub: Subscription;
  ingredients: IngredientInventory[];
  pantryIdToUpdate: string;
  expirationDateToUpdate: string;

  constructor(private pantryService: PantryService, private alertController: AlertController) { }

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

  async deletePantry(pantryId: string){
    const alert = await this.alertController.create({
      header: 'Supprimer ?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          handler: () => { },
        },
        {
          text: 'Oui',
          role: 'confirm',
          handler: () => {
            this.pantryService.deletePantry(pantryId).subscribe(response => {
              this.getPantries();
            });
          },
        },
      ],
    });

    await alert.present();
  }

  ionViewWillEnter() {
    this.getPantries();
  }

  refresh(){
    this.pantryService.refreshPantry().subscribe(data => {
      this.getPantries();
    });
  }

  async updateDate(pantryId: string, expirationDate: string){
    this.pantryIdToUpdate = pantryId;
    this.expirationDateToUpdate = new Date(expirationDate).toISOString().substring(0, 10);

    const alert = await this.alertController.create({
      header: 'Mettre à jour la date de péremption',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: (input: any) => {
            this.updateExpirationDate(this.pantryIdToUpdate, input[0]);
          },
        },
      ],
      inputs: [
        {
          type: 'date',
          placeholder: 'Date',
          id: "date",
          value: this.expirationDateToUpdate
        }
      ],
    });

    await alert.present();
  }

  updateExpirationDate(pantryId: string, date: string){
    this.pantryService.updateExpirationDate(pantryId, date).subscribe(data => {
      this.getPantries();
    });
  }
}
