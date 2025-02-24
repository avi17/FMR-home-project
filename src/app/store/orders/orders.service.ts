import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Order } from "../modal/order.modal";

@Injectable()
export class OrderServiceForPrivateThings {
  url = "/api/Orders";

  constructor(private http: HttpClient) {}
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.url);
  }
}
