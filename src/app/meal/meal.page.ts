import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DisplayableMealStatus } from './meal.model';
import { MealService } from './meal.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.page.html',
  styleUrls: ['./meal.page.scss'],
})
export class MealPage implements OnInit {

  mealSub: Subscription;
  meals: DisplayableMealStatus[];

  constructor(private mealService: MealService, private alertController: AlertController) { }

  display(data: DisplayableMealStatus[]){
    this.meals = data;
  }

  ngOnInit() {
    this.getMeals();
  }

  getMeals(){
    this.mealSub = this.mealService.getMeals().subscribe(data => {
      this.display(data);
    });
  }

  async deleteMeal(mealId: string){
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
            this.mealService.deleteMeal(mealId).subscribe(response => {
              this.getMeals();
            });
          },
        },
      ],
    });

    await alert.present();
  }

  async consumeMeal(mealID: string){
    const alert = await this.alertController.create({
      header: 'Consommer ?',
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
            this.mealService.consumeMeal(mealID).subscribe(data => {
              this.getMeals();
            })
          },
        },
      ],
    });

    await alert.present();
  }

  ionViewWillEnter() {
    this.getMeals();
  }
}
