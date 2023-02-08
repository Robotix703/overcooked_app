import { Component, OnInit } from '@angular/core';
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

  constructor(private mealService: MealService) { }

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

  deleteMeal(mealId: string){
    this.mealService.deleteMeal(mealId).subscribe(response => {
      this.getMeals();
    });
  }

  consumeMeal(mealID: string){
    this.mealService.consumeMeal(mealID).subscribe(data => {
      this.getMeals();
    })
  }

  ionViewWillEnter() {
    this.getMeals();
  }
}
