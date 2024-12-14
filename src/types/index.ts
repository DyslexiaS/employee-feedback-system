export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'EMPLOYEE';
  department: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  employeeId: string;
  reviewerId: string;
  period: string;
  status: 'PENDING' | 'SUBMITTED' | 'APPROVED';
  feedback?: string;
  rating?: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}