export interface Pantry {
  _id: string
  ingredientID: string
  quantity: number
  expirationDate: Date | null
  frozen: boolean | null
}

export interface IngredientInventory {
  ingredientID: string,
  ingredientName: string,
  ingredientImagePath: string,
  ingredientFreezable: boolean,
  ingredientUnitOfMeasure: string,
  pantries: Pantry[]
}

export interface FormPantry {
  ingredientName: string;
  quantity: number;
  expirationDate: string | null;
  frozen: boolean;
}
