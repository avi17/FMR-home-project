import { Order } from "./order.modal";
import { User } from "./user.modal";

export interface AppState {
    users: {
        entities : { [id : number] : User },
        selectedUserId : number | null;
    };
    orders: { entities : { [id : number] : Order } };
}