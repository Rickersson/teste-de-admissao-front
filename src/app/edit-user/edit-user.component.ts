import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
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
      currentPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    this.loadUserData();
  }

  loadUserData(): void {
    // Simulação - na prática você buscaria do serviço
    this.currentUser = {
      id: this.userId,
      email: 'usuario@exemplo.com'
    };
    
    // Ou usando um serviço real:
    // this.userService.getUser(this.userId).subscribe(user => {
    //   this.currentUser = user;
    // });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmNewPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const formData = this.editForm.value;
      
      // Simulação - na prática você chamaria um serviço
      console.log('Dados para atualização:', {
        id: this.userId,
        email: formData.newEmail || this.currentUser.email,
        newPassword: formData.newPassword,
        currentPassword: formData.currentPassword
      });

      // Exemplo com serviço real:
      // this.userService.updateUser(this.userId, formData).subscribe({
      //   next: () => this.router.navigate(['/users']),
      //   error: (err) => console.error('Erro ao atualizar:', err)
      // });

      alert('Usuário atualizado com sucesso!');
      this.router.navigate(['/users']);
    }
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }
}