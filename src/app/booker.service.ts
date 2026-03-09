import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthRequest, AuthResponse, BookingPayload, BookingResponse } from './models/booker.models';

@Injectable({ providedIn: 'root' })
export class BookerService {

  // Headers obligatorios para Restful-Booker
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: HttpClient) {}

  // Endpoint 1: Crear Token
  createToken(baseUrl: string, payload: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${baseUrl}/auth`, payload, { headers: this.headers });
  }

  // Endpoint 2: Reserva estándar
  createStandardBooking(baseUrl: string, payload: BookingPayload): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(`${baseUrl}/booking`, payload, { headers: this.headers });
  }

  // Endpoint 3: Reserva VIP
  createVipBooking(baseUrl: string, payload: BookingPayload): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(`${baseUrl}/booking`, payload, { headers: this.headers });
  }

  // Endpoint 4: Reserva de Cumpleaños / Eventos
  createEventBooking(baseUrl: string, payload: BookingPayload): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(`${baseUrl}/booking`, payload, { headers: this.headers });
  }

  // Endpoint 5: Reserva de larga estancia
  createLongStayBooking(baseUrl: string, payload: BookingPayload): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(`${baseUrl}/booking`, payload, { headers: this.headers });
  }


  // Endpoint 6: Reserva para grupos
   createGroupBooking(baseUrl: string, payload: BookingPayload): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(`${baseUrl}/booking`, payload, { headers: this.headers });
  }
}
