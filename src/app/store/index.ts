import { ActionReducerMap } from "@ngrx/store";
import * as userReducer from "./users/user.reducer";
import * as orderReducer from "./orders/orders.reducer";
import { AppState } from "./app.state";
import {
  createFeatureSelector,
  createSelector,
  createReducer,
  on,
  Action,
} from "@ngrx/store";
import * as userFromReducer from "./users/user.reducer";
import * as ordersFromReducer from "./orders/orders.reducer";

export const reducers: ActionReducerMap<AppState> = {
  userState: userReducer.userReducer,
  orderState: orderReducer.orderReducer,
};

export const getCurrentOrderByUser = createSelector(
  ordersFromReducer.getOrderState,
  userFromReducer.getUserState,
  ordersFromReducer.getSelectCurrentOrderByUserId,
  (state, user, orders) => {
    console.log("state" + state);
    console.log("user" + user);
    console.log("user" + orders);
    if (orders === null) {
      return {
        id: 0,
        productName: "",
        productCode: "New",
        description: "New user from user " + user.selectedUserId,
        starRating: 0,
      };
    } else {
      return orders;
    }
  }
);
