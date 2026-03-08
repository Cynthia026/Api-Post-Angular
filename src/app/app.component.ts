import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookerService } from './booker.service';
import { BookingPayload } from './models/booker.models';

type PostMode = 'AUTH' | 'STANDARD' | 'VIP' | 'EVENT' | 'LONGSTAY' | 'GROUP';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="shell">
    <header class="top">
      <div class="title center">
        <h1>Restful-Booker POST API</h1>
        <p>6 Ejemplos de peticiones POST</p>
      </div>

      <div class="nav-pills">
        <button class="pill-btn" [class.active]="mode() === 'AUTH'" (click)="setMode('AUTH')">1. Token Auth</button>
        <button class="pill-btn" [class.active]="mode() === 'STANDARD'" (click)="setMode('STANDARD')">2. Estándar</button>
        <button class="pill-btn" [class.active]="mode() === 'VIP'" (click)="setMode('VIP')">3. VIP</button>
        <button class="pill-btn" [class.active]="mode() === 'EVENT'" (click)="setMode('EVENT')">4. Cumpleaños</button>
        <button class="pill-btn" [class.active]="mode() === 'LONGSTAY'" (click)="setMode('LONGSTAY')">5. Estudiante</button>
        <button class="pill-btn" [class.active]="mode() === 'GROUP'" (click)="setMode('GROUP')">6. Grupal</button>
      </div>
    </header>

    <main class="grid">
      <div class="card form-card">
        
        <div class="input-group" style="background: #222; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px dashed #4facfe;">
            <label style="color: #4facfe;">API Base URL:</label>
            <input type="text" [(ngModel)]="apiBaseUrl" class="input" style="width: 100%; box-sizing: border-box; margin-top: 5px;">
        </div>

        <h3 style="margin-top: 0; color: #4facfe;">Cuerpo de la Petición (Payload)</h3>
        
        <div *ngIf="mode() === 'AUTH'">
           <p class="muted">Para generar un token, se requiere el usuario y contraseña del administrador.</p>
           <pre class="code-box">{{ authPayload | json }}</pre>
        </div>

        <div *ngIf="mode() !== 'AUTH'">
            <div class="input-group">
                <label>Nombre del Huésped:</label>
                <div style="display: flex; gap: 10px;">
                    <input type="text" [(ngModel)]="currentBooking.firstname" class="input" style="flex: 1;">
                    <input type="text" [(ngModel)]="currentBooking.lastname" class="input" style="flex: 1;">
                </div>
            </div>
            <div class="input-group">
                <label>Precio Total ($):</label>
                <input type="number" [(ngModel)]="currentBooking.totalprice" class="input">
            </div>
            <div class="input-group">
                <label>Peticiones Especiales:</label>
                <textarea [(ngModel)]="currentBooking.additionalneeds" class="input" rows="2"></textarea>
            </div>
        </div>

        <button class="btn" (click)="sendPost()" [disabled]="isLoading()">
          {{ isLoading() ? 'Enviando al servidor...' : 'Ejecutar POST' }}
        </button>
      </div>

      <div class="card response-card">
        <h3 style="margin-top: 0; color: #fc3d21;">Respuesta del Servidor</h3>
        
        <div class="center muted" *ngIf="!serverResponse() && !errorMessage() && !isLoading()">
            Presiona el botón para ejecutar la petición POST.
        </div>

        <div class="center" *ngIf="isLoading()">
            <span class="spinner"></span>
            <p>Conectando...</p>
        </div>

        <div *ngIf="serverResponse()" style="color: #4ade80;">
            <p>✅ <strong>Status 200 OK:</strong> El servidor procesó el POST exitosamente.</p>
            <pre class="code-box">{{ serverResponse() | json }}</pre>
        </div>

        <div *ngIf="errorMessage()" style="color: #f87171;">
            <p>❌ <strong>Error:</strong> {{ errorMessage() }}</p>
            <p style="font-size: 12px; color: #aaa;">Si el error dice CORS, intenta pegar una URL Proxy.</p>
        </div>
      </div>
    </main>
  </div>
  `,
  styles: [`
    .shell { max-width: 1000px; margin: 0 auto; padding: 28px 18px; font-family: sans-serif; color: #fff;}
    .center { text-align: center; }
    .top { margin-bottom: 30px; }
    .title h1 { margin: 0; color: #000; }  
    .title p { color: #555; }            
    .nav-pills { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-top: 20px;}
    .pill-btn { background: #1a1a1a; border: 1px solid #333; color: #aaa; padding: 10px 20px; border-radius: 20px; cursor: pointer; transition: 0.3s; }
    .pill-btn.active { background: #0B3D91; color: white; border-color: #4facfe; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    @media (max-width: 768px) { .grid { grid-template-columns: 1fr; } }
    .card { background: #1a1a1a; border: 1px solid #333; border-radius: 12px; padding: 25px; }
    .input-group { margin-bottom: 15px; display: flex; flex-direction: column; gap: 8px; }
    .input { background: #222; border: 1px solid #444; color: white; padding: 10px; border-radius: 8px; font-family: inherit; }
    .btn { background: #0B3D91; color: white; border: none; padding: 12px; border-radius: 8px; cursor: pointer; font-weight: bold; width: 100%; margin-top: 10px;}
    .btn:disabled { background: #555; cursor: not-allowed; }
    .code-box { background: #000; padding: 15px; border-radius: 8px; color: #4facfe; overflow-x: auto; font-family: monospace; }
    .muted { color: #aaa; font-size: 14px; line-height: 1.5;}
    .spinner { width: 24px; height: 24px; border-radius: 50%; border: 3px solid rgba(255,255,255,.3); border-top-color: white; animation: spin 1s linear infinite; display: inline-block; }
    @keyframes spin{ to{ transform: rotate(360deg);} }
  `]
})
export class AppComponent {
  mode = signal<PostMode>('AUTH');
  isLoading = signal<boolean>(false);
  serverResponse = signal<any | null>(null);
  errorMessage = signal<string>('');

  // AQUÍ GUARDAMOS LA URL QUE ESCRIBES EN LA PANTALLA
  apiBaseUrl: string = 'https://restful-booker.herokuapp.com';

  authPayload = { username: 'admin', password: 'password123' };
  currentBooking: BookingPayload = this.getDefaultBooking();

  constructor(private bookerService: BookerService) {
    this.setMode('AUTH');
  }

  setMode(newMode: PostMode) {
    this.mode.set(newMode);
    this.serverResponse.set(null);
    this.errorMessage.set('');

    switch(newMode) {
        case 'STANDARD':
            this.currentBooking = { firstname: 'Flor', lastname: 'Salvador', totalprice: 150, depositpaid: true, bookingdates: { checkin: '2026-04-01', checkout: '2026-04-05' }, additionalneeds: 'Desayuno incluido' };
            break;
        case 'VIP':
            this.currentBooking = { firstname: 'Humbe', lastname: 'Dueño del Cielo', totalprice: 3500, depositpaid: true, bookingdates: { checkin: '2026-05-10', checkout: '2026-05-12' }, additionalneeds: 'Suite presidencial, privacidad máxima' };
            break;
        case 'EVENT':
            this.currentBooking = { firstname: 'Paty', lastname: 'Sorpresa 60', totalprice: 800, depositpaid: false, bookingdates: { checkin: '2026-06-15', checkout: '2026-06-16' }, additionalneeds: 'Decoración temática de Cielito Lindo en la habitación' };
            break;
        case 'LONGSTAY':
            this.currentBooking = { firstname: 'Estudiante', lastname: 'ITP', totalprice: 4500, depositpaid: true, bookingdates: { checkin: '2026-08-01', checkout: '2026-12-15' }, additionalneeds: 'Escritorio amplio e internet de alta velocidad' };
            break;
        case 'GROUP':
            this.currentBooking = { firstname: 'Equipo', lastname: 'Desarrollo API', totalprice: 2000, depositpaid: true, bookingdates: { checkin: '2026-07-20', checkout: '2026-07-25' }, additionalneeds: 'Sala de juntas reservada' };
            break;
    }
  }

  getDefaultBooking(): BookingPayload {
    return { firstname: '', lastname: '', totalprice: 0, depositpaid: false, bookingdates: { checkin: '', checkout: '' }, additionalneeds: '' };
  }

  sendPost() {
    if (!this.apiBaseUrl) {
      this.errorMessage.set('Por favor ingresa la URL de la API.');
      return;
    }

    this.isLoading.set(true);
    this.serverResponse.set(null);
    this.errorMessage.set('');

    const observer = {
      next: (res: any) => {
        this.serverResponse.set(res);
        this.isLoading.set(false);
      },
      error: (err: any) => {
        console.error(err);
        this.errorMessage.set(err.message || 'Error al conectar con la API (Posible bloqueo CORS)');
        this.isLoading.set(false);
      }
    };

    // Pasamos this.apiBaseUrl a cada llamada del servicio
    switch(this.mode()) {
      case 'AUTH': this.bookerService.createToken(this.apiBaseUrl, this.authPayload).subscribe(observer); break;
      case 'STANDARD': this.bookerService.createStandardBooking(this.apiBaseUrl, this.currentBooking).subscribe(observer); break;
      case 'VIP': this.bookerService.createVipBooking(this.apiBaseUrl, this.currentBooking).subscribe(observer); break;
      case 'EVENT': this.bookerService.createEventBooking(this.apiBaseUrl, this.currentBooking).subscribe(observer); break;
      case 'LONGSTAY': this.bookerService.createLongStayBooking(this.apiBaseUrl, this.currentBooking).subscribe(observer); break;
      case 'GROUP': this.bookerService.createGroupBooking(this.apiBaseUrl, this.currentBooking).subscribe(observer); break;
    }
  }
}