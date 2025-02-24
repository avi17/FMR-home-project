import {
  createFeatureSelector,
  createSelector,
  createReducer,
  on,
  Action,
} from "@ngrx/store";
import { filter } from "rxjs/operators";
import * as fromActions from "./orders.actions";
import * as fromAdapter from "./orders.adapter";
import { OrderState } from "../app.state";

export const initialState: OrderState = fromAdapter.adapter.getInitialState({
  selectedOrderId: "",
  selectedOrderByUserId: "",
});

// Creating reducer
const _OrderReducer = createReducer(
  initialState,
  on(fromActions.AddOrder, (state, { payload }) =>
    fromAdapter.adapter.addOne(payload.order, state)
  ),
  on(fromActions.AddOrders, (state, { payload }) =>
    fromAdapter.adapter.addMany(payload.orders, state)
  ),
  on(fromActions.UpdateOrder, (state, { payload }) =>
    fromAdapter.adapter.updateOne(payload.order, state)
  ),
  on(fromActions.UpdateOrders, (state, { payload }) =>
    fromAdapter.adapter.updateMany(payload.orders, state)
  ),
  on(fromActions.RemoveOrder, (state, { payload }) =>
    fromAdapter.adapter.removeOne(payload.id, state)
  ),
  on(fromActions.RemoveOrders, (state, { payload }) =>
    fromAdapter.adapter.removeMany(payload.ids, state)
  ),
  on(fromActions.ClearOrders, (state) =>
    fromAdapter.adapter.removeAll({ ...state, selectedOrderId: "" })
  ),
  on(fromActions.LoadOrdersSuccess, (state, { payload }) => {
    state = fromAdapter.adapter.removeAll({ ...state, selectedOrderId: "" });
    return fromAdapter.adapter.addMany(payload.orders, state);
  }),
  on(fromActions.SelectOrder, (state, { payload }) => {
    console.log("here3");
    return Object.assign({ ...state, selectedOrderId: payload?.orderId });
  }),
  on(fromActions.SelectOrderByUserId, (state, { payload }) => {
    console.log("here4" + state + payload);
    //state.entities.pipe()
    return { ...state, selectedOrderByUserId: payload?.userId.toString() };
  })
);

export function orderReducer(state: any, action: Action) {
  return _OrderReducer(state, action);
}

// Creating selectors
export const getSelectedOrderId = (state: OrderState) => state.selectedOrderId;
export const getSelectCurrentOrderByUserId = (state: OrderState) =>
  state.selectedOrderByUserId;

export const getOrderState = createFeatureSelector<OrderState>("orderState");
export const selectOrderIds = createSelector(
  getOrderState,
  fromAdapter.selectOrderIds
);

export const selectOrderEntities = createSelector(
  getOrderState,
  fromAdapter.selectOrderEntities
);

export const selectAllOrders = createSelector(
  getOrderState,
  fromAdapter.selectAllOrders
);

export const OrdersCount = createSelector(
  getOrderState,
  fromAdapter.orderCount
);

export const selectCurrentOrderId = createSelector(
  getOrderState,
  getSelectedOrderId
);

export const selectCurrentOrderByUserId = createSelector(
  getOrderState,
  getSelectCurrentOrderByUserId
);

export const selectCurrentOrder = createSelector(
  selectOrderEntities,
  selectCurrentOrderId,
  (orderEntities, orderId) => orderId && orderEntities[orderId]
);

// export const selectCurrentOrderByUser = createSelector(
//   selectOrderEntities,
//   selectCurrentOrderByUserId,
//   (orderEntities, userId) => userId && orderEntities[userId]
// );
// export const selectCurrentOrderByUser = (userId: number) =>
//   createSelector(
//     selectOrderEntities,
//     selectCurrentOrderByUserId,
//     (orderEntities) => {return Object.values(orderEntities).find(x=> x.userId == userId)}
//   );
export const selectCurrentOrderByUser = createSelector(
  selectOrderEntities,
  selectCurrentOrderByUserId,
  (orderEntities, userId) => {
    console.log("getorderbyuser");
    return Object.values(orderEntities).filter((order) => {
      if (order.userId === +userId) return order;
    });
  }
);
