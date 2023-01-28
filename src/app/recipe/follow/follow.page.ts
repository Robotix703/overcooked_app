import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { IngredientWithQuantity } from 'src/app/meal/meal.model';
import { PrettyInstruction, Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.page.html',
  styleUrls: ['./follow.page.scss'],
})
export class FollowPage implements OnInit {

  recipeSub: Subscription;
  instructionSub: Subscription;
  recipe: Recipe;
  instructions: PrettyInstruction[];
  recipeId: string;
  composition: IngredientWithQuantity[];
  isLoading: boolean;
  checkedInstructions: number = 0;
  proportion: number;

  constructor(private recipeService: RecipeService,
    private navCtrl: NavController,
    private route: ActivatedRoute) { }

  display(recipe: Recipe, instructions: PrettyInstruction[]){
    this.recipe = recipe;
    this.composition = JSON.parse(recipe.composition);
    this.instructions = instructions.sort(this.sortInstruction);
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
      this.recipeSub = this.recipeService.getRecipe(this.recipeId).subscribe(recipeData => {
        this.instructionSub = this.recipeService.getInstructions(this.recipeId).subscribe(instructionData => {
          this.display(recipeData, instructionData);
        });
      });
    });
  }

  sortInstruction(a: PrettyInstruction, b: PrettyInstruction){
    return a.order - b.order;
  }

  onChecked(value: boolean){
    if(value) this.checkedInstructions++;
    else this.checkedInstructions--;

    this.proportion = this.checkedInstructions / this.instructions.length;
  }
}
