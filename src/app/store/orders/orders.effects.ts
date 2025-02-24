import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap } from "rxjs/operators";
import * as fromActions from "./orders.actions";
import { AppService } from "../app.service";

@Injectable()
export class OrderEffects {
  constructor(private actions$: Actions, private orderService: AppService) {}
  loadAllOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.LoadOrders),
      tap(console.log),
      switchMap(() =>
        this.orderService.getAllOrders().pipe(
          tap(console.log),
          map((data) =>
            fromActions.LoadOrdersSuccess({ payload: { orders: data } })
          ),
          tap(console.log)
        )
      )
    )
  );
}
