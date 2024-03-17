import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PrettyInstruction, Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';
import { Tag } from '../../home/tag.model';
import { Ingredient } from 'src/app/meal/meal.model';

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
  tagSub: Subscription;
  ingredientSub: Subscription;
  tags: Tag[];
  editInstructions: boolean = false;
  
  recipeTitle: string;
  recipeNumberOfLunch: number;
  recipeCategory: string;
  recipeDuration: number;
  recipeTagsID: string[];

  recipeInstructions: PrettyInstruction[];

  ingredientsFound: Ingredient[];
  instructionSelectedForIngredient: PrettyInstruction;

  alertButtons = [
    {
      text: 'Annuler',
      role: 'cancel'
    },
    {
      text: 'OK',
      role: 'confirm'
    },
  ];

  isModalOpen = false;

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

    this.tagSub = this.recipeService.getTags().subscribe(tags => {
      this.tags = tags;
    });
  }

  onSave(){
    if(!this.editInstructions){
      this.recipeService.editRecipeDescription(this.recipeId, this.recipeTitle, this.recipeNumberOfLunch, this.recipeCategory, this.recipeDuration, this.recipeTagsID).subscribe((response : any) => {
        if(response.message === "OK"){
          this.navCtrl.navigateBack('/recipe/follow/' + this.recipeId);
        } else {
          console.error(response);
        }
      });
    } else {
      this.recipeService.editRecipeInstructions(this.recipeId, this.recipeInstructions).subscribe((response : any) => {
        if(response.message === "OK"){
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
    this.recipe = recipe;
    this.isLoading = false;

    this.recipeTitle = recipe.title;
    this.recipeNumberOfLunch = recipe.numberOfLunch;
    this.recipeCategory = recipe.category;
    this.recipeDuration = recipe.duration;

    this.recipeInstructions = instructions;

    this.recipeTagsID = recipe.tagsId;
  }

  removeIngredient(instructionId: string, ingredientname: string){
    let instructionNumber = this.recipeInstructions.findIndex(e => e._id === instructionId);
    this.recipeInstructions[instructionNumber].composition = this.recipeInstructions[instructionNumber].composition.filter(e => e.name !== ingredientname);

    this.display(this.recipe, this.recipeInstructions);
  }

  setResult(ev: any, instructionId: string) {
    if(ev.detail.role === "confirm"){
      //New
      if(instructionId === "NEW"){
        this.recipeInstructions = this.recipeInstructions.filter(e => e._id !== instructionId);
        this.display(this.recipe, this.recipeInstructions);
        return;
      }
      //Existing
      this.recipeService.deleteInstruction(instructionId).subscribe((response: any) => {
        if(response.message === "OK"){
          this.recipeInstructions = this.recipeInstructions.filter(e => e._id !== instructionId);
          this.display(this.recipe, this.recipeInstructions);
        } else {
          console.error(response);
        }
      });
    }
  }

  onAddInstruction(){
    let newInstruction : PrettyInstruction = {
      _id: "NEW",
      text: "",
      recipeID: this.recipeId,
      composition: [],
      order: this.recipeInstructions.length + 1
    };
    this.recipeInstructions.push(newInstruction);
    this.display(this.recipe, this.recipeInstructions);
  }

  openIngredientSelection(instruction: PrettyInstruction) {
    this.isModalOpen = true;
    this.instructionSelectedForIngredient = instruction;
  }

  closeIngredientSelection() {
    this.isModalOpen = false;
  }

  handleIngredientSearch(event) {
    const ingredientName = event.target.value.toLowerCase();
    this.ingredientSub = this.recipeService.searchIngredients(ingredientName).subscribe((result: {ingredients: Ingredient[], ingredientCount: number}) => {
      this.ingredientsFound = result.ingredients;
    });
  }

  onIngredientSelect(ingredientSelected: Ingredient){
    this.isModalOpen = false;
    this.instructionSelectedForIngredient.composition.push({
      name: ingredientSelected.name,
      imagePath: ingredientSelected.imagePath,
      quantity: 1,
      unitOfMeasure: ingredientSelected.unitOfMeasure
    });
    this.display(this.recipe, this.recipeInstructions);
  }

  onIonInfinite(ev) {

  }
}
