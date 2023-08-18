import { IncomingHttpHeaders } from "http";

export interface UserBase {
  id?: number;
  name: string;
  lastname: string;
  password: string;
  email: string;
  google?: boolean;
  token?: string;
  role?: RoleAttributes;
  roleId?: number;
}

export interface UserAttributes extends UserBase {
  address?: string;
  dni?: string;
  phoneNumber?: string;
  newPassword?: string;
  google?: boolean;
  secretOtp?: string;
  salt?: string;
  newsletter?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface GameAttributes {
  id: number;
  name: string;
  totalPlayers: number;
  initHour: number;
  endHour: number;
  active?: boolean;
  dayValue?: DaysAttributes["value"];
  campusId?: number;
}

export interface GameTypeAttributes {
  id: number;
  value: string;
  label: string;
}

export interface ListAttributes {
  id: number;
  name: string;
  totalPlayers: number;
  playersQuantity: number;
  initHour: number;
  endHour: number;
  active: boolean;
  gameId?: number;
}

export interface PlayerListAttributes {
  id: number;
  // name: string;
  // playersQuantity: number;
  // initHour: number;
  // endHour: number;
  // active?: boolean;
  // gameId?: number;
}

export interface CampusAttributes {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  active?: boolean;
}

export interface DaysAttributes {
  id?: number;
  value: string;
  label: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface RoleAttributes {
  id: number;
  value: string;
  label: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface PlayerAttributes {
  id: number;
  name: string;
  lastname: string;
  type: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ReviewAttributes {
  id: number;
  title: string;
  description: string;
  stars: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ReqHeader extends IncomingHttpHeaders {
  email: string;
  password: string;
}

export interface ReqQuery {
  offset: number;
  limit: number;
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

export enum GameTypeValues {
  Five = "10",
  Six = "12",
  Seven = "14",
  Eight = "16",
  Nine = "18",
  Eleven = "22",
}

export enum GameTypeLabels {
  Five = "Fut5",
  Six = "Fut6",
  Seven = "Fut7",
  Eight = "Fut8",
  Nine = "Fut9",
  Eleven = "Fut11",
}
