export interface IProduct {
  _id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  isChecked?: boolean
}
export interface IProductSuccess {
  id: string;
}
