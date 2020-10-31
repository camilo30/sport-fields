import {DniType, UserType, Role} from './types';

export interface User {
  _id: string;
  userType: UserType;
  name: string;
  dniType: DniType;
  dni: string;
  code: string;
  phone: string;
  email: string;
  password: string;
  role: Role;
}
