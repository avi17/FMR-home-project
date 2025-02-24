import { createAction, props } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { User } from "../modal/user.modal";

enum UserRecrodsActionTypes {
  ADD_USER = "[USERRECORDS] Add User",
  ADD_USERS = "[USERRECORDS] Add Users",
  UPDATE_USER = "[USERRECORDS] Update User",
  UPDATE_USERS = "[USERRECORDS] Update Users",
  REMOVE_USER = "[USERRECORDS] Remove User",
  REMOVE_USERS = "[USERRECORDS] Remove Users",
  CLEAR_USERS = "[USERRECORDS] Clear Users",
  LOAD_ALL_USERS = "[USERRECORDS] Load All Users",
  LOAD_ALL_USERS_SUCCESS = "[USERRECORDS] Load All Users Success",
  SELECT_USER = "[USERRECORDS] User By Id",
  SELECT_USERORDER = "[USERRECORDS] User Order By Id",
  
}

export const AddUser = createAction(
  UserRecrodsActionTypes.ADD_USER,
  props<{ payload: { user: User } }>()
);

export const AddUsers = createAction(
  UserRecrodsActionTypes.ADD_USERS,
  props<{ payload: { users: User[] } }>()
);

export const UpdateUser = createAction(
  UserRecrodsActionTypes.UPDATE_USER,
  props<{ payload: { user: Update<User> } }>()
);

export const UpdateUsers = createAction(
  UserRecrodsActionTypes.UPDATE_USERS,
  props<{ payload: { users: Update<User>[] } }>()
);

export const RemoveUser = createAction(
  UserRecrodsActionTypes.REMOVE_USER,
  props<{ payload: { id: number } }>()
);

export const RemoveUsers = createAction(
  UserRecrodsActionTypes.REMOVE_USERS,
  props<{ payload: { ids: number[] } }>()
);

export const ClearUsers = createAction(UserRecrodsActionTypes.CLEAR_USERS);

export const LoadUsers = createAction(UserRecrodsActionTypes.LOAD_ALL_USERS);

export const LoadUsersSuccess = createAction(
  UserRecrodsActionTypes.LOAD_ALL_USERS_SUCCESS,
  props<{ payload: { users: User[] } }>()
);

export const SelectUser = createAction(
  UserRecrodsActionTypes.SELECT_USER,
  props<{ payload: { userId: number } }>()
);

export const SelectUserOrderById = createAction(
  UserRecrodsActionTypes.SELECT_USERORDER,
  props<{ payload: { userId: number } }>()
);

