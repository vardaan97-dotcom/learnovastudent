// SCORM-compliant learning types

export type LessonStatus = 'locked' | 'not_started' | 'in_progress' | 'completed';
export type QuizStatus = 'locked' | 'not_started' | 'in_progress' | 'passed' | 'failed';
export type ModuleStatus = 'locked' | 'not_started' | 'in_progress' | 'completed';

export interface LearnerProfile {
  id: string;
  name: string;
  email: string;
  learnerId: string;
  avatar?: string;
  enrolledDate: string;
  organization?: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  provider: string;
  providerLogo?: string;
  description: string;
  totalDuration: string;
  totalModules: number;
  totalLessons: number;
  totalQuizQuestions: number;
  passingScore: number;
  certificateAvailable: boolean;
  examVoucher?: ExamVoucher;
}

export interface ExamVoucher {
  code: string;
  examName: string;
  expiryDate: string;
  isRedeemed: boolean;
  redeemedDate?: string;
}

export interface Module {
  id: string;
  number: number;
  title: string;
  description?: string;
  duration: string;
  status: ModuleStatus;
  lessons: Lesson[];
  quiz: Quiz;
  progress: number;
}

export interface Lesson {
  id: string;
  number: number;
  title: string;
  type: 'video' | 'document' | 'interactive';
  duration: string;
  status: LessonStatus;
  progress: number; // 0-100 percentage watched
  videoUrl?: string;
  thumbnailUrl?: string;
  lastPosition?: number; // seconds
  completedAt?: string;
}

export interface Quiz {
  id: string;
  title: string;
  totalQuestions: number;
  passingScore: number;
  timeLimit?: number; // minutes
  status: QuizStatus;
  attempts: QuizAttempt[];
  bestScore?: number;
  questions: QuizQuestion[];
}

export interface QuizAttempt {
  id: string;
  attemptNumber: number;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  startedAt: string;
  completedAt: string;
  timeSpent: string;
  passed: boolean;
}

export interface QuizQuestion {
  id: string;
  questionNumber: number;
  questionText: string;
  questionType: 'single' | 'multiple' | 'true_false';
  options: QuizOption[];
  correctOptionIds: string[];
  explanation?: string;
  points: number;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

// Progress tracking (SCORM-compliant)
export interface LearnerProgress {
  courseId: string;
  learnerId: string;
  overallProgress: number;
  modulesCompleted: number;
  totalModules: number;
  lessonsCompleted: number;
  totalLessons: number;
  quizzesPassed: number;
  totalQuizzes: number;
  totalTimeSpent: string;
  averageScore: number;
  questionsAttempted: number;
  questionsCorrect: number;
  lastAccessedAt: string;
  startedAt: string;
  completedAt?: string;
  certificateEarned: boolean;
  certificateUrl?: string;
}

// Qubits Practice Test System
export interface QubitsModule {
  id: string;
  title: string;
  subtitle?: string;
  totalQuestions: number;
  attemptedQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unattempted: number;
  accuracy: number;
  isSelected: boolean;
  questionsToAttempt: number;
}

export interface QubitsDashboard {
  totalQuizzes: number;
  totalQuestionsAttempted: number;
  overallAccuracy: number;
  timeSpent: string;
  streak: number;
  lastPracticeDate: string;
}

// Support & Resources
export interface Trainer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  specialization: string;
  avatar?: string;
  rating: number;
  responseTime: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'link' | 'lab' | 'download';
  url: string;
  size?: string;
  isNew?: boolean;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'reminder';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

// Navigation
export type TabId = 'course' | 'qubits' | 'resources' | 'support' | 'certificate';
