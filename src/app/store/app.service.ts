import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Order } from "./modal/order.modal";

@Injectable()
export class AppService {
  orderUrl = "/api/orders";
  userUrl = "/api/users";

  constructor(private http: HttpClient) {}
    getAllOrders(): Observable<Order[]> {
      return this.http.get<Order[]>(this.orderUrl);
    }

    getAllUsers(): Observable<Order[]> {
      return this.http.get<Order[]>(this.userUrl);
    }
}
