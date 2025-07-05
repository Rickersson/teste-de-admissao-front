import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user.interface';
import { KeycloakService } from '../services/keycloak.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule]
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  currentPage = 1;
  pageSize = 5;
  Math = Math;
  isLoading = true;

  constructor(
    private router: Router,
    private userService: UserService,
    private keycloakService: KeycloakService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  get paginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredUsers.slice(startIndex, startIndex + this.pageSize);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage * this.pageSize < this.filteredUsers.length) {
      this.currentPage++;
    }
  }

 filterUsers(): void {
  if (!this.searchTerm) {
    this.filteredUsers = [...this.users];
    return;
  }
  
  const term = this.searchTerm.toLowerCase();
  this.filteredUsers = this.users.filter(user => 
    user.email.toLowerCase().includes(term) ||
    (user.isActive ? 'ativo' : 'inativo').includes(term)
  );
  this.currentPage = 1;
}

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = [...this.users];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
        this.isLoading = false;
      }
    });
  }

  logout(): void {
    this.keycloakService.logout();      
    this.router.navigate(['/login']);   
  }


deleteUser(userId: number): void {
  if (confirm('Tem certeza que deseja excluir este usuário?')) {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.users = this.users.filter(user => user.id !== userId);
        this.filterUsers();
        alert('Usuário excluído com sucesso!');
      },
      error: (error) => {
        console.error('Erro ao excluir usuário:', error);
        alert('Ocorreu um erro ao excluir o usuário');
      }
    });
  }
}
}