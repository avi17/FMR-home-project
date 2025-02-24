export interface Order {
  id: number;
  userId: number;
  total: number;
}

export class OrderObject implements Order {
  userId: number = 0;
  total: number = 0;
  id: number = 0;
}

export class OrderWithUserData {
  sumOfOrders: number = 0;
  orders: Order[];
  name: string = "";
}
