export interface UserBase {
  id?: number;
  name: string;
  lastname: string;
  password: string;
  email: string;
  google?: boolean;
  token?: string;
  role?: RoleI;
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
