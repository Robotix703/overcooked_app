import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { IngredientWithQuantity } from 'src/app/meal/meal.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  recipeSub: Subscription;
  recipe: Recipe;
  recipeId: string;
  composition: IngredientWithQuantity[];
  isLoading: boolean;
  arrayNumberOfLunch: number[];

  constructor(
    private recipeService: RecipeService,
    private navCtrl: NavController,
    private route: ActivatedRoute) { }

  display(data: Recipe){
    this.recipe = data;
    this.composition = JSON.parse(data.composition);
    this.arrayNumberOfLunch = Array(this.recipe.numberOfLunch);
    this.isLoading = false;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('recipeId')) {
        this.navCtrl.navigateBack('/home');
        return;
      }
      this.recipeId = paramMap.get('recipeId');

      this.isLoading = true;
      this.recipeSub = this.recipeService.getRecipe(this.recipeId).subscribe(data => {
        this.display(data);
      });
    });
  }

}
