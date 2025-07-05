import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
   standalone: true, imports:[FormsModule, ReactiveFormsModule, CommonModule, FormsModule]
})
export class EditUserComponent implements OnInit {
  editForm: FormGroup;
  hidePassword = true;
  currentUser: any;
  userId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.editForm = this.fb.group({
  newEmail: ['', [Validators.email]],
  newPassword: ['', [Validators.minLength(6)]],
  confirmNewPassword: [''],
  currentPassword: ['', Validators.required],
  status: []
}, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    this.loadUserData();
  }

loadUserData(): void {
  this.userService.getUser(this.userId).subscribe({
    next: (user) => {
      this.currentUser = user;
      
      this.editForm.patchValue({
        newEmail: user.email,
        status: user.isActive
      });
    },
    error: (err) => {
      console.error('Erro ao carregar usuário:', err);
      alert('Erro ao carregar os dados do usuário');
      this.router.navigate(['/users']);
    }
  });
}

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmNewPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

serverError: string | null = null;

onSubmit(): void {
  this.serverError = null;

  if (this.editForm.valid) {
    const { newEmail, newPassword, currentPassword, status } = this.editForm.value;

    // Montar payload dinâmico
    const updatedUser: any = {};

    if (newEmail && newEmail !== this.currentUser.email) {
      updatedUser.email = newEmail;
    }

    if (typeof status === 'boolean') {
      updatedUser.isActive = status;
    }

    if (newPassword) {
      updatedUser.newPassword = newPassword;
      updatedUser.currentPassword = currentPassword;
    }

    this.userService.updateUser(this.userId, updatedUser).subscribe({
      next: () => {
        alert('Usuário atualizado com sucesso!');
        this.router.navigate(['/users']);
      },
      error: (err) => {
        console.error('Erro ao atualizar usuário:', err);
        this.serverError = err.error?.message || 'Erro ao atualizar o usuário';
      }
    });
  }
}



  cancel(): void {
    this.router.navigate(['/users']);
  }
}