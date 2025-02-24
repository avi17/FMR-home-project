export interface User {
  id: number;
  name: string;
  password: string;
}

export class UserObject implements User {
  id: number = 0;
  name: string = "";
  password: string = "";
}
