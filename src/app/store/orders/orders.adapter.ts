import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { Order } from "../modal/order.modal";

export const adapter: EntityAdapter<Order> = createEntityAdapter<Order>({
  sortComparer: false,
});

export const {
  selectIds: selectOrderIds,
  selectEntities: selectOrderEntities,
  selectAll: selectAllOrders,
  selectTotal: orderCount,
} = adapter.getSelectors();
