import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PrettyInstruction, Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  recipe: Recipe;
  recipeId: string;
  isLoading: boolean;
  recipeSub: Subscription;
  instructionSub: Subscription;

  constructor(private recipeService: RecipeService,
    private navCtrl: NavController,
    private route: ActivatedRoute) { }

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

  display(recipe: Recipe, instructions: PrettyInstruction[]){
    this.recipe = recipe;
    this.isLoading = false;
  }

}
