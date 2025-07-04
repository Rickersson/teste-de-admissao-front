import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  private tokenEndpoint = 'http://localhost:8080/realms/my-app/protocol/openid-connect/token';
  private accessToken: string | null = null;

  constructor(private http: HttpClient) {}

  directLogin(username: string, password: string) {
    const body = new URLSearchParams();
    body.set('client_id', 'angular-app');
    body.set('grant_type', 'password');
    body.set('username', username);
    body.set('password', password);

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Accept', 'application/json');

    return this.http.post(this.tokenEndpoint, body.toString(), { headers })
      .pipe(
        tap((response: any) => {
          console.log('Login successful:', response);
          this.accessToken = response.access_token;
          localStorage.setItem('keycloak_token', response.access_token);
        }),
        catchError(error => {
          console.error('Login error details:', error);
          if (error.error) {
            console.error('Error response:', error.error);
          }
          return of(null);
        })
      );
  }

  getToken(): string | null {
    return this.accessToken || localStorage.getItem('keycloak_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.accessToken = null;
    localStorage.removeItem('keycloak_token');
  }
}