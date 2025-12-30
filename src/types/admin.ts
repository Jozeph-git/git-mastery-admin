export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'instructor' | 'student';
  status: 'active' | 'inactive' | 'suspended';
  avatar?: string;
  createdAt: Date;
  lastActive?: Date;
  completedModules: number;
  totalModules: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  status: 'draft' | 'published' | 'archived';
  lessonsCount: number;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  createdAt: Date;
  updatedAt: Date;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  content: string;
  order: number;
  type: 'video' | 'text' | 'quiz' | 'exercise';
  duration: string;
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalModules: number;
  publishedModules: number;
  totalLessons: number;
  completionRate: number;
}