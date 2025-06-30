import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'src/app/services/keycloak.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private keycloakService: KeycloakService,
    private router: Router
  ) {}

  // Método de login via Keycloak
  onLogin(): void {
    this.keycloakService.getKeycloak().login();
  }

  // Método de logout
  onLogout(): void {
    this.keycloakService.logout();
    this.router.navigate(['/login']);
  }
}