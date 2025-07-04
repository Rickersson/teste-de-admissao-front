// interfaces/user.interface.ts
export interface User {
  id: number;
  email: string;
  password?: string; // Opcional pois pode não ser necessário no frontend
  isActive: boolean;
}