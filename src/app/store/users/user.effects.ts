import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap } from "rxjs/operators";
import * as fromActions from "./user.actions";
import { AppService } from "../app.service";

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: AppService) {}
  loadAllUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.LoadUsers),
      tap(console.log),
      switchMap(() =>
        this.userService.getAllUsers().pipe(
          tap(console.log),
          map((data) =>
            fromActions.LoadUsersSuccess({ payload: { users: data } })
          ),
          tap(console.log)
        )
      )
    )
  );
  
}
