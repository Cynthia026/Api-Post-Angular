// Servicio para consumir CrudCrud con POST usando una URL dinámica

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Payload que enviamos en el POST (CrudCrud lo guarda y regresa un _id)
export interface CreatePostRequest {
  title: string;
  body: string;
  userId: number;
}

// Respuesta del API (mismo payload + _id)
export interface PostResponse extends CreatePostRequest {
  _id: string;
}

@Injectable({ providedIn: 'root' })
export class CrudCrudPostsService {

  constructor(private http: HttpClient) {}

  // POST: crea un post en {baseUrl}/posts
  createPost(baseUrl: string, payload: CreatePostRequest): Observable<PostResponse> {
    // baseUrl ejemplo: https://crudcrud.com/api/TU_TOKEN
    const url = `${baseUrl}/posts`;
    return this.http.post<PostResponse>(url, payload);
  }
}
