import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'], imports: [ ReactiveFormsModule, CommonModule, FormsModule]
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  serverError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    }, { validators: this.passwordsMatch });
  }

  private passwordsMatch(fg: FormGroup) {
    const pw = fg.get('password')!.value;
    const cpw = fg.get('confirmPassword')!.value;
    return pw === cpw ? null : { mismatch: true };
  }

  onSubmit(): void {
    this.serverError = null;
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.signupForm.value;
    this.authService.register(email, password).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => {
        console.error(err);
        this.serverError = err.error?.message || 'Falha ao registrar';
      }
    });
  }
}