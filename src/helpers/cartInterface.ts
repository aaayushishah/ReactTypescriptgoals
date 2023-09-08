export interface ICart {
  userId: String;
  productId: String;
  quantity: Number;
  price: Number;
  amount: Number;
}

export interface ICartProductDetails {
  _id: Number;
  userId: String;
  productId: String;
  quantity: Number;
  price: Number;
  amount: Number;
  productName: String;
  productDesc: String;
}

export interface IPlaceOrderDetails {
  userId: String;
  billAmount: Number;
  orderItems: Array<Number>
}
