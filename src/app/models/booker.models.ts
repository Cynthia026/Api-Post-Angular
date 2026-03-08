// 1. Interfaces para el POST de Autenticación
export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

// 2. Interfaces para los POST de Reservaciones
export interface BookingDates {
  checkin: string;
  checkout: string;
}

export interface BookingPayload {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds: string;
}

export interface BookingResponse {
  bookingid: number;
  booking: BookingPayload;
}