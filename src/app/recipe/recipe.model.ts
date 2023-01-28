export interface Recipe{
  _id: string
  title: string
  numberOfLunch: number
  imagePath: string
  category: string
  duration: number
  lastCooked: Date | null
  composition: string | null
}

export interface PrettyInstruction {
  _id: string,
  text: string,
  recipeID: string,
  composition: PrettyIngredient[],
  order: number,
  cookingTime: number | null,
  checked: boolean
}

export interface PrettyIngredient {
  name: string,
  imagePath: string,
  quantity: number,
  unitOfMeasure: string
}
