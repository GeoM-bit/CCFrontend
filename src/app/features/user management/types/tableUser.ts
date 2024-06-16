import {Roles} from "../../../core/enums/roles";

export class TableUser{
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailConfirmed: boolean;
  role: Roles;
  initialEmail: string;
}
