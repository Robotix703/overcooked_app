import { Tag } from "../home/tag.model"

export interface Recipe{
  _id: string
  title: string
  numberOfLunch: number
  imagePath: string
  category: string
  duration: number
  lastCooked: Date | null
  composition: string | null
  tags: string[]
}

export interface PrettyRecipe{
  _id: string
  title: string
  numberOfLunch: number
  imagePath: string
  category: string
  duration: number
  lastCooked: Date | null
  composition: string | null
  tags: Tag[]
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

export const categoriesRecipe = [
  "Accompagnement",
  "Plat",
  "Dessert"
]