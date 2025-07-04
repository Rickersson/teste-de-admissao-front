import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'src/app/services/keycloak.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  serverError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private keycloakService: KeycloakService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLocalLogin() {
    this.serverError = null;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.value;

    this.keycloakService.directLogin(username, password).subscribe({
      next: (success) => {
        if (success) {
          this.router.navigate(['/users']);
        }
      },
      error: (err) => {
        console.error('Authentication failed:', err);
        this.serverError = 'Credenciais inválidas.';
      }
    });
  }

  onLogout() {
    this.keycloakService.logout();
  }
}
