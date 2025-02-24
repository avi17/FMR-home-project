import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { distinctUntilChanged, filter, Observable, switchMap } from "rxjs";
import { User } from "../modal/user.modal";
import { Store } from "@ngrx/store";

@Injectable()
export class UserServiceForPrivateThings {
  url = "/api/users";

  constructor(private http: HttpClient,private store: Store<{ selectedUserId: string }>) {}
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getUserDetails(userId: string): Observable<User> {
    return this.http.get<User>(`${this.url}/${userId}`);
  }

  listenToUserChanges(): Observable<any> {
    return this.store.select('selectedUserId').pipe(
      distinctUntilChanged(), // מונע קריאות כפולות אם ה-ID לא השתנה
      filter(userId => !!userId), // מבטיח שהערך אינו ריק
      switchMap(userId => this.getUserDetails(userId)) // ביטול קריאה קודמת במקרה של שינוי
    );
  }
}
