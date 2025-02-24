import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, FormControl } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as fromReducer from "../../store/users/user.reducer";
import * as fromActions from "../../store/users/user.actions";
import * as fromAppReducer from "../../store/index";
import { UserState } from "src/app/store/app.state";
import { User, UserObject } from "src/app/store/modal/user.modal";
import { OrderWithUserData } from "src/app/store/modal/order.modal";
import { UserServiceForPrivateThings } from "src/app/store/users/user.service";

@Component({
  selector: "app-users",
  templateUrl: "users.component.html",
  styleUrls: ["./users.component.css", "../../app.component.css"],
  standalone: false,
})
export class UserComponent implements OnInit {
  allUsers$: Observable<User[]>;
  userDetails$: Observable<any>;
  userById$: Observable<User | undefined>;
  usersData$: User[];
  count$: Observable<number>;
  userIds$: Observable<string[] | number[]>;
  orderById$: Observable<OrderWithUserData| number[]>;
  task = "";
  userId: number;
  userForm = {} as FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<UserState>,
    private userService: UserServiceForPrivateThings
  ) {
    this.allUsers$ = store.select(fromReducer.selectAllUsers);

    //Keep user denied from update same id before it's finsih other API call with the same ID.
    
    this.userDetails$ = this.userService.listenToUserChanges();
    //this.allUsers$.subscribe((res) => console.log(res));
    this.count$ = store.select(fromReducer.UsersCount);
    this.userIds$ = store.select(fromReducer.selectUserIds);
    this.userById$ = store.select(fromReducer.selectCurrentUser);
    this.orderById$ = store.select(fromReducer.selectCurrentUserWithOrder);
    this.userId = 0;
    
  }

  ngOnInit() {
    this.store.dispatch(fromActions.LoadUsers());
  }

  ngOnDestroy(e) {
    alert(e);
  }

  createBlankUserForm() {
    this.userForm = this.formBuilder.group({
      usersArray: this.formBuilder.array([]),
    });
  }

  createUserFormForAdd() {
    this.createBlankUserForm();
    this.addMoreControlForAdd();
  }

  get usersFormArray(): FormArray {
    console.log("@hereee");
    return this.userForm?.get("usersArray") as FormArray;
  }

  addMoreControlForAdd() {
    let ag = this.formBuilder.group(new UserObject());
    this.usersFormArray.push(ag);
  }

  updateUserForm() {
    this.createBlankUserForm();
    this.allUsers$.subscribe((users) => {
      console.log("updateUserForm" + users);
      if (users && users.length > 0) {
        let user = users[0];
        console.log("updateUserForm" + user);
        let ag = this.formBuilder.group(user);
        this.usersFormArray.push(ag);
      }
    });
  }

  addMoreControlForUpdate() {
    this.allUsers$.subscribe((users) => {
      if (
        users &&
        users.length > 0 &&
        this.usersFormArray?.length < users.length
      ) {
        let len = this.usersFormArray.length;
        let User = users[len];
        let ag = this.formBuilder.group(User);
        this.usersFormArray.push(ag);
      }
    });
  }

  deleteFormArrayControl(idx: number) {
    this.usersFormArray.removeAt(idx);
  }

  addUserView() {
    this.task = "add";
    this.createUserFormForAdd();
  }

  updateUserView() {
    this.task = "update";
    this.updateUserForm();
  }

  removeUserView() {
    this.task = "remove";
    this.createBlankUserForm();
    this.allUsers$.subscribe((users) => {
      this.createBlankUserForm();
      users.forEach((User) => {
        let ag = this.formBuilder.group({
          UserData: User,
          chk: false,
        });
        this.usersFormArray.push(ag);
      });
    });
  }

  userByIdView() {
    this.task = "select";
  }

  userOrderByIdView() {
    this.task = "selectOrder";
  }

  onFormSubmitForAdd() {
    if (this.usersFormArray.length === 1) {
      this.addUser(this.usersFormArray.at(0).value);
    } else if (this.usersFormArray.length > 1) {
      this.addUsers(this.usersFormArray.value);
    }
    this.createBlankUserForm();
    this.loadAllUsers();
  }

  onFormSubmitForUpdate() {
    if (this.usersFormArray.length === 1) {
      this.updateUser(this.usersFormArray.at(0).value);
    } else if (this.usersFormArray.length > 1) {
      this.updateUsers(this.usersFormArray.value);
    }
    this.createBlankUserForm();
    this.loadAllUsers();
  }

  onFormSubmitForRemove() {
    let UserIdsToDelete: number[] = [];
    this.usersFormArray.controls.forEach((result) => {
      if (result.get("chk")?.value) {
        UserIdsToDelete.push(result.get("UserData")?.value.id);
      }
    });
    if (UserIdsToDelete.length == 1) {
      this.removeUser(UserIdsToDelete[0]);
    } else if (UserIdsToDelete.length > 1) {
      this.removeUsers(UserIdsToDelete);
    }
  }

  addUser(data: User) {
    if (data == null) return;
    this.store.dispatch(fromActions.AddUser({ payload: { user: data } }));
  }

  addUsers(data: User[]) {
    if (data == null) return;
    this.store.dispatch(fromActions.AddUsers({ payload: { users: data } }));
  }

  updateUser(data: User) {
    if (data == null) return;
    this.store.dispatch(
      fromActions.UpdateUser({
        payload: { user: { id: data.id, changes: data } },
      })
    );
  }
  updateUsers(data: User[]) {
    if (data == null) return;
    let allUpdates = data.map((User) =>
      Object.assign({}, { id: User.id, changes: User })
    );
    this.store.dispatch(
      fromActions.UpdateUsers({ payload: { users: allUpdates } })
    );
  }
  removeUser(userId: number) {
    if (userId == null) return;
    this.store.dispatch(fromActions.RemoveUser({ payload: { id: userId } }));
  }
  removeUsers(userIds: number[]) {
    if (userIds == null) return;
    this.store.dispatch(fromActions.RemoveUsers({ payload: { ids: userIds } }));
  }
  clearAllUsers() {
    this.store.dispatch(fromActions.ClearUsers());
  }
  loadAllUsers() {
    this.task = "all";
  }

  selectUserById() {
    this.store.dispatch(
      fromActions.SelectUser({ payload: { userId: this.userId } })
    );
  }

  selectUserAndOrderById() {
    this.store.dispatch(
      fromActions.SelectUserOrderById({ payload: { userId: this.userId } })
    );
  }
}
