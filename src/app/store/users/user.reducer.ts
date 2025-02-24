import {
  createFeatureSelector,
  createSelector,
  createReducer,
  on,
  Action,
} from "@ngrx/store";
import * as fromActions from "./user.actions";
import * as fromAdapter from "./user.adapter";
import { UserState } from "../app.state";
import * as ordersFromActions from "../orders/orders.actions";
import * as ordersFromReducer from "../orders/orders.reducer";
import { UserObject } from "../modal/user.modal";
import { OrderObject, Order, OrderWithUserData } from "../modal/order.modal";

export const initialState: UserState = fromAdapter.adapter.getInitialState({
  selectedUserId: "",
});

// Creating reducer
const _UserReducer = createReducer(
  initialState,
  on(fromActions.AddUser, (state, { payload }) => {
    if (
      Object.values(state.entities).find((x) => x.id === +payload?.user?.id)
    ) {
      return fromAdapter.adapter.updateOne(
        { id: payload.user.id, changes: payload.user },
        state
      );
    } else return fromAdapter.adapter.addOne(payload.user, state);
  }),

  on(fromActions.AddUsers, (state, { payload }) => {
    // payload?.users.filter(x=>
    //   Object.values(state.entities).find((x) => x.id === +x.id)
    // )

    return fromAdapter.adapter.addMany(payload.users, state);
  }),

  on(fromActions.UpdateUser, (state, { payload }) => {
    console.log("UpdateUser");
    return fromAdapter.adapter.updateOne(payload.user, state);
  }),

  on(fromActions.UpdateUsers, (state, { payload }) =>
    fromAdapter.adapter.updateMany(payload.users, state)
  ),

  on(fromActions.RemoveUser, (state, { payload }) =>
    fromAdapter.adapter.removeOne(payload.id, state)
  ),

  on(fromActions.RemoveUsers, (state, { payload }) =>
    fromAdapter.adapter.removeMany(payload.ids, state)
  ),

  on(fromActions.ClearUsers, (state) =>
    fromAdapter.adapter.removeAll({ ...state, selectedUserId: "" })
  ),

  on(fromActions.LoadUsersSuccess, (state, { payload }) => {
    state = fromAdapter.adapter.removeAll({ ...state, selectedUserId: "" });
    return fromAdapter.adapter.addMany(payload.users, state);
  }),

  on(fromActions.SelectUser, (state, { payload }) =>
    Object.assign({ ...state, selectedUserId: payload.userId })
  ),

  on(fromActions.SelectUserOrderById, (state, { payload }) => {
    ordersFromReducer.orderReducer(
      ordersFromReducer.getOrderState,
      ordersFromActions.SelectOrderByUserId({ payload })
    );
    return Object.assign({ ...state, selectedUserId: payload.userId });
  })
);
export function userReducer(state: any, action: Action) {
  return _UserReducer(state, action);
}
// Creating selectors
export const getSelectedUserId = (state: UserState) => state.selectedUserId;
export const getUserState = createFeatureSelector<UserState>("userState");
export const selectUserIds = createSelector(
  getUserState,
  fromAdapter.selectUserIds
);
export const selectUserEntities = createSelector(
  getUserState,
  fromAdapter.selectUserEntities
);
export const selectAllUsers = createSelector(
  getUserState,
  fromAdapter.selectAllUsers
);
export const UsersCount = createSelector(getUserState, fromAdapter.userCount);
export const selectCurrentUserId = createSelector(
  getUserState,
  getSelectedUserId
);
export const selectCurrentUser = createSelector(
  selectUserEntities,
  selectCurrentUserId,
  (userEntities, userId) => userEntities[userId]
);

export const selectCurrentUserWithOrder = createSelector(
  ordersFromReducer.getOrderState,
  getUserState,
  selectUserEntities,
  selectCurrentUserId,
  ordersFromReducer.selectCurrentOrderByUser,
  (state, userState, user, orders) => {
    console.log("state" + state);
    console.log("user" + user);
    console.log("orders" + orders);
    console.log("state" + state.selectedOrderByUserId);
    console.log("userState" + userState);
    let returnObject: OrderWithUserData = new OrderWithUserData();
    returnObject.orders = Array<Order>();
    if (orders === null || orders === "") {
      return returnObject;
    } else {
      (returnObject.name = Object.values(userState.entities).find(
        (x) => x.id === +orders
      )?.name),
        Object.values(state.entities).filter((orderItem) => {
          if (orderItem.userId === +orders) {
            returnObject.orders.push({
              id: orderItem?.id,
              userId: +orders,
              total: orderItem?.total,
            });
            returnObject.sumOfOrders += orderItem?.total;
            console.log("returnObject" + JSON.stringify(returnObject));
          }
        });
      return returnObject;
    }
  }
);
