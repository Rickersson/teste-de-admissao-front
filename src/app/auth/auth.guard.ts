import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';

import { KeycloakService } from '../services/keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,private keycloak:KeycloakService) {}

   canActivate(): boolean {
    console.log('AuthGuard#canActivate called, isAuthenticated=', this.keycloak.isAuthenticated());
    if (this.keycloak.isAuthenticated()) {
      return true;
    }
    console.log('AuthGuard: bloqueando rota, redirecionando para /login');
    this.router.navigate(['/login']);
    return false;
  }
}
