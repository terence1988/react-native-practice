class CartItem {
  public quantity: number;
  public productPrice: string;
  public productTitle: string;
  public sum: number;
  constructor(
    quantity: number,
    productPrice: string,
    productTitle: string,
    sum: number
  ) {
    this.quantity = quantity;
    this.productPrice = productPrice;
    this.productTitle = productTitle;
    this.sum = sum;
  }
}

export default CartItem;
