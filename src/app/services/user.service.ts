// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get('/api/users');
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`/api/users/${id}`);
  }
}