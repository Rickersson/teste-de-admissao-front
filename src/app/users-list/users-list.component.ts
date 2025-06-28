import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';
  currentPage = 1;
  pageSize = 5;
  Math = Math; 

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users = [
      { id: 1, name: 'João Silva', email: 'joao@exemplo.com', status: 'Ativo' },
      { id: 2, name: 'Maria Souza', email: 'maria@exemplo.com', status: 'Ativo' },
      { id: 3, name: 'Pedro Oliveira', email: 'pedro@exemplo.com',  status: 'Inativo' },
      { id: 4, name: 'Ana Costa', email: 'ana@exemplo.com',  status: 'Ativo' },
      { id: 5, name: 'Carlos Mendes', email: 'carlos@exemplo.com',  status: 'Inativo' },
      { id: 6, name: 'Fernanda Lima', email: 'fernanda@exemplo.com',  status: 'Ativo' },
      { id: 7, name: 'Ricardo Alves', email: 'ricardo@exemplo.com',  status: 'Ativo' },
    ];
    this.filteredUsers = [...this.users];
  }

  filterUsers(): void {
    if (!this.searchTerm) {
      this.filteredUsers = [...this.users];
      return;
    }
    
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(user => 
      user.name.toLowerCase().includes(term) || 
      user.email.toLowerCase().includes(term) ||
      user.role.toLowerCase().includes(term) ||
      user.status.toLowerCase().includes(term)
    );
    this.currentPage = 1;
  }

  get paginatedUsers(): any[] {
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

  deleteUser(userId: number): void {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.users = this.users.filter(user => user.id !== userId);
      this.filterUsers();
      alert('Usuário excluído com sucesso!');
    }
  }
}