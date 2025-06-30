import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  private keycloak: any;

  constructor() {}

  async init(): Promise<void> {
    const Keycloak = require('keycloak-js');

    this.keycloak = new Keycloak({
      url: 'http://localhost:8080',
      realm: 'my-realm',
      clientId: 'angular-app'
    });

    await this.keycloak.init({ onLoad: 'login-required' });
  }

  getKeycloak(): any {
    return this.keycloak;
  }

  logout(): void {
    this.keycloak.logout();
  }
}