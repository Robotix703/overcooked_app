import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PrettyInstruction, Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

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

  @ViewChild('f', { static: false }) form: NgForm;
  @ViewChild('g', { static: false }) form2: NgForm;

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
    this.navCtrl.navigateBack('/recipe/follow/' + this.recipeId);
  }

  editRecipe(){

  }

  onChangeEditMode(event){
    let type = event.detail.value;
    this.editInstructions = (type === "instructions");
    console.log(this.editInstructions);
  }

  display(recipe: Recipe, instructions: PrettyInstruction[]){
    console.log(recipe);
    console.log(instructions);
    this.recipe = recipe;
    this.isLoading = false;
  }
}
