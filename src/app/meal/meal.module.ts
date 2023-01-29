import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { MealPageRoutingModule } from './meal-routing.module';

import { MealPage } from './meal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MealPageRoutingModule,
    ScrollingModule
  ],
  declarations: [MealPage]
})
export class MealPageModule {}
