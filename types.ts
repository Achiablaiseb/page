
export type UserRole = 'ADMIN' | 'CLIENT';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Project {
  id: string;
  clientId: string;
  name: string;
  location: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  startDate: string;
  progress: number; // 0 to 100
}

export interface ConstructionStage {
  id: string;
  projectId: string;
  name: string;
  percentage: number;
  completed: boolean;
}

export interface Payment {
  id: string;
  projectId: string;
  amount: number;
  status: 'PAID' | 'PENDING';
  date: string;
  milestone: string;
}

export interface ProgressUpdate {
  id: string;
  projectId: string;
  description: string;
  createdAt: string;
  imageUrl?: string;
}
