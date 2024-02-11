import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IngredientService } from '../ingredient.service';
import { FormPantry } from '../pantry.model';
import { PantryService } from '../pantry.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  @ViewChild('f', { static: false }) form: NgForm;

  ingredientSub: Subscription;
  ingredientsName: string[];
  displayedIngredients: string[];
  ingredientNameInput: string;
  checked: boolean = false;

  constructor(
    private pantryService: PantryService,
    private ingredientService: IngredientService,
    private route: Router
  ) { }

  ngOnInit() {
    this.ingredientSub = this.ingredientService.getIngredientsName().subscribe(data => {
      this.ingredientsName = data;
    });
  }

  searchIngredient(inputText: any){
    inputText = inputText.detail.value;
    let found = this.ingredientsName.find(element => element.search(inputText) >= 0);

    this.displayIngredientsName([found]);
  }

  displayIngredientsName(ingredientsName: string[]){
    this.displayedIngredients = ingredientsName;
  }

  createPantry(){
    if (!this.form.valid) { return; }

    let expirationDate = this.form.value.expirationDate ? new Date(this.form.value.expirationDate).toLocaleDateString("fr-FR", { timeZone: "Europe/Paris" }) : null;

    const pantryData: FormPantry = {
      ingredientName: this.form.value.ingredientName,
      quantity: this.form.value.quantity,
      expirationDate: expirationDate
    };

    this.pantryService.createPantry(pantryData).subscribe(data => {
      this.route.navigate(['/pantry/list']);
    });
  }

  fillIngredient(ingredientName: string){
    this.ingredientNameInput = ingredientName;
  }
}
