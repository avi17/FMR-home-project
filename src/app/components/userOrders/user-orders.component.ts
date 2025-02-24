import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable, tap } from "rxjs";
import * as fromReducer from "../../store/orders/orders.reducer";
import * as fromActions from "../../store/orders/orders.actions";
import * as userFromReducer from "../../store/users/user.reducer";
import * as userFromActions from "../../store/orders/orders.actions";
import { OrderObject, Order, OrderWithUserData } from "../../store/modal/order.modal";
import { OrderState } from "src/app/store/app.state";

@Component({
  selector: "user-orders",
  templateUrl: "user-orders.component.html",
  standalone: false,
})
export class OrdersComponent implements OnInit {
  allOrders$: Observable<Order[]>;
  orderById$: Observable<Order | undefined>;
  orderByUserId$: Observable<Order[] | undefined>;
  orderAndUserByUserId$: Observable<OrderWithUserData | undefined>;
  ordersData$: Order[];
  count$: Observable<number>;
  orderIds$: Observable<string[] | number[]>;
  task = "";
  orderId: number;
  userId: number;
  orderForm = {} as FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<OrderState>
  ) {
    this.allOrders$ = store.select(fromReducer.selectAllOrders);
    //this.allOrders$.subscribe((res) => console.log(res));
    this.count$ = store.select(fromReducer.OrdersCount);
    this.orderIds$ = store.select(fromReducer.selectOrderIds);
    this.orderById$ = store.select(fromReducer.selectCurrentOrder);
    this.orderByUserId$ = store.select(fromReducer.selectCurrentOrderByUser);
    this.orderAndUserByUserId$ = store.select(userFromReducer.selectCurrentUserWithOrder);
    this.orderId = this.userId = 0;
  }

  ngOnInit() {
    this.store.dispatch(fromActions.LoadOrders());
  }

  ngOnDestroy(e){
    alert(e)
    
  }


  createBlankOrderForm() {
    this.orderForm = this.formBuilder.group({
      ordersArray: this.formBuilder.array([]),
    });
  }

  createOrderFormForAdd() {
    this.createBlankOrderForm();
    this.addMoreControlForAdd();
  }

  get ordersFormArray(): FormArray {
    console.log("@hereee");
    return this.orderForm?.get("ordersArray") as FormArray;
  }

  addMoreControlForAdd() {
    let ag = this.formBuilder.group(new OrderObject());
    this.ordersFormArray.push(ag);
  }

  updateOrderForm() {
    this.createBlankOrderForm();
    this.allOrders$.subscribe((orders) => {
      console.log("updateOrderForm" + orders);
      if (orders && orders.length > 0) {
        let order = orders[0];
        console.log("updateOrderForm" + order);
        let ag = this.formBuilder.group(order);
        this.ordersFormArray.push(ag);
      }
    });
  }

  addMoreControlForUpdate() {
    this.allOrders$.subscribe((orders) => {
      if (
        orders &&
        orders.length > 0 &&
        this.ordersFormArray?.length < orders.length
      ) {
        let len = this.ordersFormArray.length;
        let Order = orders[len];
        let ag = this.formBuilder.group(Order);
        this.ordersFormArray.push(ag);
      }
    });
  }

  deleteFormArrayControl(idx: number) {
    this.ordersFormArray.removeAt(idx);
  }

  addOrderView() {
    this.task = "add";
    this.createOrderFormForAdd();
  }

  updateOrderView() {
    this.task = "update";
    this.updateOrderForm();
  }

  removeOrderView() {
    this.task = "remove";
    this.createBlankOrderForm();
    this.allOrders$.subscribe((orders) => {
      this.createBlankOrderForm();
      orders.forEach((Order) => {
        let ag = this.formBuilder.group({
          OrderData: Order,
          chk: false,
        });
        this.ordersFormArray.push(ag);
      });
    });
  }

  orderByIdView() {
    this.task = "select";
  }

  orderByUserIdView() {
    this.task = "selectByUserId";
  }

  onFormSubmitForAdd() {
    if (this.ordersFormArray.length === 1) {
      this.addOrder(this.ordersFormArray.at(0).value);
    } else if (this.ordersFormArray.length > 1) {
      this.addOrders(this.ordersFormArray.value);
    }
    this.createBlankOrderForm();
    this.loadAllOrders();
  }

  onFormSubmitForUpdate() {
    if (this.ordersFormArray.length === 1) {
      this.updateOrder(this.ordersFormArray.at(0).value);
    } else if (this.ordersFormArray.length > 1) {
      this.updateOrders(this.ordersFormArray.value);
    }
    this.createBlankOrderForm();
    this.loadAllOrders();
  }

  onFormSubmitForRemove() {
    let OrderIdsToDelete: number[] = [];
    this.ordersFormArray.controls.forEach((result) => {
      if (result.get("chk")?.value) {
        OrderIdsToDelete.push(result.get("OrderData")?.value.id);
      }
    });
    if (OrderIdsToDelete.length == 1) {
      this.removeOrder(OrderIdsToDelete[0]);
    } else if (OrderIdsToDelete.length > 1) {
      this.removeOrders(OrderIdsToDelete);
    }
  }

  addOrder(data: Order) {
    if (data == null) return;
    this.store.dispatch(fromActions.AddOrder({ payload: { order: data } }));
  }

  addOrders(data: Order[]) {
    if (data == null) return;
    this.store.dispatch(fromActions.AddOrders({ payload: { orders: data } }));
  }

  updateOrder(data: Order) {
    if (data == null) return;
    this.store.dispatch(
      fromActions.UpdateOrder({
        payload: { order: { id: data.id, changes: data } },
      })
    );
  }
  updateOrders(data: Order[]) {
    if (data == null) return;
    let allUpdates = data.map((Order) =>
      Object.assign({}, { id: Order.id, changes: Order })
    );
    this.store.dispatch(
      fromActions.UpdateOrders({ payload: { orders: allUpdates } })
    );
  }
  removeOrder(orderId: number) {
    if (orderId == null) return;
    this.store.dispatch(fromActions.RemoveOrder({ payload: { id: orderId } }));
  }
  removeOrders(orderIds: number[]) {
    if (orderIds == null) return;
    this.store.dispatch(
      fromActions.RemoveOrders({ payload: { ids: orderIds } })
    );
  }
  clearAllOrders() {
    this.store.dispatch(fromActions.ClearOrders());
  }

  loadAllOrders() {
    this.task = "all";
  }

  selectOrderById() {
    this.store.dispatch(
      fromActions.SelectOrder({ payload: { orderId: this.orderId } })
    );
  }

  selectOrderByUserId() {
    console.log("here");
    //fromActions.SelectOrderByUserId({ payload: { userId: this.userId } });
    //this.store.select(fromReducer.selectCurrentOrderByUser(this.userId));
    this.store.dispatch(
      fromActions.SelectOrderByUserId({ payload: { userId: this.userId } })
    );
  }
}
