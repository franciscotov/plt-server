import { ENUM } from "sequelize";

export interface UserBase {
  name: string;
  lastname: string;
  password: string;
  email: string;
  role: string;
  google: boolean;
}

export interface UserAttributes extends UserBase {
  id: number;
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

export enum Day {
  Lunes = "lunes",
  Martes = "martes",
  Miercoles = "miercoles",
  Jueves = "jueves",
  Viernes = "viernes",
  Sabado = "sabado",
  domingo = "domingo",
}
