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
  type: number;
  date: number;
  initHour: number;
  endHour: number;
  campusId?: number;
}

export interface CampusAttributes {
  id?: number;
  name: string;
  adress: string;
  lat: number;
  lng: number;
}
