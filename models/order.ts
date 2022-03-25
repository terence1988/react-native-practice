import dayjs from "dayjs";

class Order {
  public id: string;
  public items: any[];
  public totalAmount: number;
  public date: Date;

  constructor(id: string, items: any[], totalAmount: number, date: Date) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }

  get readableDate() {
    return dayjs(this.date).format("YYYY-MM-DD[ ]HH:mm:ss");
  }
}

export default Order;
