export interface Pantry {
  _id: string
  ingredientID: string
  quantity: number
  expirationDate: Date | null
  frozen: boolean | null
}

export interface PrettyPantry {
  _id: string
  ingredientName: string
  ingredientImage: string
  quantity: number
  quantityUnitOfMeasure: string
  expirationDate: string | null
  frozen: boolean | null
}
