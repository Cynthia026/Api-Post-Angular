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

  // Recibimos la 'baseUrl' desde el formulario antes de enviarla
  createToken(baseUrl: string, payload: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${baseUrl}/auth`, payload, { headers: this.headers });
  }

  createStandardBooking(baseUrl: string, payload: BookingPayload): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(`${baseUrl}/booking`, payload, { headers: this.headers });
  }

  createVipBooking(baseUrl: string, payload: BookingPayload): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(`${baseUrl}/booking`, payload, { headers: this.headers });
  }

  createEventBooking(baseUrl: string, payload: BookingPayload): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(`${baseUrl}/booking`, payload, { headers: this.headers });
  }

  createLongStayBooking(baseUrl: string, payload: BookingPayload): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(`${baseUrl}/booking`, payload, { headers: this.headers });
  }

  createGroupBooking(baseUrl: string, payload: BookingPayload): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(`${baseUrl}/booking`, payload, { headers: this.headers });
  }
}