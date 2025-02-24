import { BrowserModule, platformBrowser } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { reducers } from "./store/index";
import { UserEffects } from "./store/users/user.effects";
import { InMemoryWebApiModule } from "node_modules/angular-in-memory-web-api";
import { MockData } from "./mock-data";
import { HttpClientModule } from "@angular/common/http";
import { UserComponent } from "./components/userManagment/users.component";
import { OrdersComponent } from "./components/userOrders/user-orders.component";
import { AppService } from "./store/app.service";
import { OrderEffects } from "./store/orders/orders.effects";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { UserServiceForPrivateThings } from "./store/users/user.service";

@NgModule({
  declarations: [AppComponent, UserComponent, OrdersComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([UserEffects, OrderEffects]),
    InMemoryWebApiModule.forRoot(MockData),
  ],
  providers: [AppService,UserServiceForPrivateThings],
  bootstrap: [AppComponent],
})
export class AppModule {}

platformBrowser().bootstrapModule(AppModule);
