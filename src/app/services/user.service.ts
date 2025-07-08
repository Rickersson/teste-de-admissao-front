// services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, of } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { KeycloakService } from './keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/auth/users'; 
 

  constructor(private http: HttpClient, private keycloakService: KeycloakService) { }

   getUsers(): Observable<User[]> {
  return this.http.get<User[]>(this.apiUrl).pipe(
    map(users => users.map(user => ({
      ...user,
     
      isActive: Boolean(user.isActive)
    })))
  );
}
   deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }

  getUser(id: string): Observable<User> {
  return this.http.get<User>(`${this.apiUrl}/${id}`);
}

updateUser(id: string, data: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, data);
}
}