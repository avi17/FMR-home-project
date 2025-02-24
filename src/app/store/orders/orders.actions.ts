import { createAction, props } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { Order } from "../modal/order.modal";

enum OrderRecrodsActionTypes {
  ADD_ORDER = "[ORDERRECORDS] Add Order",
  ADD_ORDERS = "[ORDERRECORDS] Add Orders",
  UPDATE_ORDER = "[ORDERRECORDS] Update Order",
  UPDATE_ORDERS = "[ORDERRECORDS] Update Orders",
  REMOVE_ORDER = "[ORDERRECORDS] Remove Order",
  REMOVE_ORDERS = "[ORDERRECORDS] Remove Orders",
  CLEAR_ORDERS = "[ORDERRECORDS] Clear Orders",
  LOAD_ALL_ORDERS = "[ORDERRECORDS] Load All Orders",
  LOAD_ALL_ORDERS_SUCCESS = "[ORDERRECORDS] Load All Orders Success",
  SELECT_ORDER = "[ORDERRECORDS] Order By Id",
  SELECT_ORDERBYUSR = "[ORDERRECORDS] Order By UserId",
}

export const AddOrder = createAction(
  OrderRecrodsActionTypes.ADD_ORDER,
  props<{ payload: { order: Order } }>()
);

export const AddOrders = createAction(
  OrderRecrodsActionTypes.ADD_ORDERS,
  props<{ payload: { orders: Order[] } }>()
);

export const UpdateOrder = createAction(
  OrderRecrodsActionTypes.UPDATE_ORDER,
  props<{ payload: { order: Update<Order> } }>()
);

export const UpdateOrders = createAction(
  OrderRecrodsActionTypes.UPDATE_ORDERS,
  props<{ payload: { orders: Update<Order>[] } }>()
);

export const RemoveOrder = createAction(
  OrderRecrodsActionTypes.REMOVE_ORDER,
  props<{ payload: { id: number } }>()
);

export const RemoveOrders = createAction(
  OrderRecrodsActionTypes.REMOVE_ORDERS,
  props<{ payload: { ids: number[] } }>()
);

export const ClearOrders = createAction(OrderRecrodsActionTypes.CLEAR_ORDERS);

export const LoadOrders = createAction(OrderRecrodsActionTypes.LOAD_ALL_ORDERS);

export const LoadOrdersSuccess = createAction(
  OrderRecrodsActionTypes.LOAD_ALL_ORDERS_SUCCESS,
  props<{ payload: { orders: Order[] } }>()
);

export const SelectOrder = createAction(
  OrderRecrodsActionTypes.SELECT_ORDER,
  props<{ payload: { orderId: number } }>()
);

export const SelectOrderByUserId = createAction(
  OrderRecrodsActionTypes.SELECT_ORDERBYUSR,
  props<{ payload: { userId: number } }>()
);
