import {
  EntityAdapter,
  createEntityAdapter,
} from "@ngrx/entity";
import { User } from "../modal/user.modal";

//In case we need filer
export function sortByCategory(ob1: User, ob2: User): number {
  return ob1.name.localeCompare(ob2.name);
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  sortComparer: false,
});

export const {
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers,
  selectTotal: userCount,
} = adapter.getSelectors();
