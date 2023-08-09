import { ENUM } from "sequelize";

export interface UserBase {
  id?: number;
  name: string;
  lastname: string;
  password: string;
  email: string;
  RoleId?: number;
  google: boolean;
}

export interface UserAttributes extends UserBase {
  address: boolean;
  dni: string;
  phoneNumber: string;
  secretOtp: string;
  salt: string;
  newsletter: boolean;
  newPassword?: string;
}

export interface GameAttributes {
  id?: number;
  name: string;
  playersQuantity: number;
  initHour: number;
  endHour: number;
  day: Day;
  campusId?: number;
}

export interface CampusAttributes {
  id?: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
}

export interface DaysAttributes {
  id?: number;
  value: string;
  label: string;
}

export interface RoleI {
  id: number;
  value: string;
  label: string;
}

export enum Day {
  Lunes = "lunes",
  Martes = "martes",
  Miercoles = "miercoles",
  Jueves = "jueves",
  Viernes = "viernes",
  Sabado = "sabado",
  Domingo = "domingo",
}
