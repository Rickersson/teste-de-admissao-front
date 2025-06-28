import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  termsAccepted: boolean = false;
  errorMessage: string | null = null;
  emailError: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  validateEmail(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailError = !emailRegex.test(this.email);
  }

  onSubmit(): void {
    this.validateEmail();
    
    if (this.emailError) {
      this.errorMessage = 'Por favor, insira um email válido.';
      return;
    }

    if (!this.termsAccepted) {
      this.errorMessage = 'Você precisa aceitar os termos.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'As senhas não coincidem.';
      return;
    }

    this.authService.register(this.email, this.password).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (error) => {
        this.errorMessage = 'Erro no registro. Verifique os dados.';
        console.error(error);
      }
    );
  }
}