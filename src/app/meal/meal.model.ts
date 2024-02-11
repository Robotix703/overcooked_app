export interface DisplayableMealStatus {
  _id: string,
  title: string,
  numberOfLunch: number,
  imagePath: string,
  state: MealStatus,
  recipeId: string
}

export interface MealStatus {
  ingredientAvailable: IngredientWithQuantity[],
  ingredientAlmostExpire: IngredientWithQuantity[],
  ingredientUnavailable: IngredientWithQuantity[]
}

export interface IngredientWithQuantity {
  ingredient: Ingredient,
  quantity: number
}

export interface Ingredient {
  _id: string
  name: string
  imagePath: string
  consumable: boolean
  unitOfMeasure: string
  shelfLife: number | null
}
