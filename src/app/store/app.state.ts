import { EntityState } from "@ngrx/entity";
import { User } from "./modal/user.modal";
import { Order } from "./modal/order.modal";

export interface UserState extends EntityState<User> {
  selectedUserId: string;
}

export interface OrderState extends EntityState<Order> {
  selectedOrderId: string;
  selectedOrderByUserId: string;
}

export interface AppState {
  userState: EntityState<User>;
  orderState: EntityState<Order>;
}
