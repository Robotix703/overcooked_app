import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PrettyInstruction, Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

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
  editInstructions: boolean = false;
  
  recipeTitle: string;
  recipeNumberOfLunch: number;
  recipeCategory: string;
  recipeDuration: number;

  recipeInstructions: PrettyInstruction[];

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

  onSave(){
    if(!this.editInstructions){
      this.recipeService.editRecipeDescription(this.recipeId, this.recipeTitle, this.recipeNumberOfLunch, this.recipeCategory, this.recipeDuration).subscribe((response : any) => {
        if(response.status === "OK"){
          this.navCtrl.navigateBack('/recipe/follow/' + this.recipeId);
        } else {
          console.error(response);
        }
      });
    } else {
      this.recipeService.editRecipeInstructions(this.recipeId, this.recipeInstructions).subscribe((response : any) => {
        if(response.status === "OK"){
          this.navCtrl.navigateBack('/recipe/follow/' + this.recipeId);
        } else {
          console.error(response);
        }
      });
    }
  }

  onChangeEditMode(event){
    let type = event.detail.value;
    this.editInstructions = (type === "instructions");
  }

  display(recipe: Recipe, instructions: PrettyInstruction[]){
    console.log(recipe);
    console.log(instructions);
    this.recipe = recipe;
    this.isLoading = false;

    this.recipeTitle = recipe.title;
    this.recipeNumberOfLunch = recipe.numberOfLunch;
    this.recipeCategory = recipe.category;
    this.recipeDuration = recipe.duration;

    this.recipeInstructions = instructions;
  }

  onIonInfinite(ev) {

  }
}
