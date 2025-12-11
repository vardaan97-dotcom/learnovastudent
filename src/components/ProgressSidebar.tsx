'use client';

import React from 'react';
import {
  TrendingUp,
  BookOpen,
  Video,
  Clock,
  Target,
  CheckCircle,
  Award,
  Flame,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LearnerProgress, QubitsDashboard } from '@/types';

interface ProgressSidebarProps {
  progress: LearnerProgress;
  qubitsDashboard: QubitsDashboard;
}

export default function ProgressSidebar({ progress, qubitsDashboard }: ProgressSidebarProps) {
  return (
    <div className="space-y-4">
      {/* Overall Progress Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-cyan-600" />
          Your Progress
        </h3>

        {/* Main Progress Circle */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#e5e7eb"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="url(#progressGradient)"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${(progress.overallProgress / 100) * 352} 352`}
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-gray-900">
                {progress.overallProgress}%
              </span>
              <span className="text-xs text-gray-500">Complete</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatItem
            icon={BookOpen}
            label="Modules"
            value={`${progress.modulesCompleted}/${progress.totalModules}`}
            color="text-purple-500"
            bgColor="bg-purple-50"
          />
          <StatItem
            icon={Video}
            label="Lessons"
            value={`${progress.lessonsCompleted}/${progress.totalLessons}`}
            color="text-blue-500"
            bgColor="bg-blue-50"
          />
          <StatItem
            icon={Clock}
            label="Time Spent"
            value={progress.totalTimeSpent}
            color="text-cyan-500"
            bgColor="bg-cyan-50"
          />
          <StatItem
            icon={Target}
            label="Avg Score"
            value={`${progress.averageScore}%`}
            color="text-green-500"
            bgColor="bg-green-50"
          />
        </div>
      </div>

      {/* Quiz Performance */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          Quiz Performance
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Quizzes Passed</span>
            <span className="text-sm font-semibold text-gray-900">
              {progress.quizzesPassed}/{progress.totalQuizzes}
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-500"
              style={{ width: `${(progress.quizzesPassed / progress.totalQuizzes) * 100}%` }}
            />
          </div>

          <div className="pt-2 grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-green-50 rounded-xl">
              <p className="text-lg font-bold text-green-600">{progress.questionsCorrect}</p>
              <p className="text-xs text-gray-500">Correct</p>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-xl">
              <p className="text-lg font-bold text-red-500">
                {progress.questionsAttempted - progress.questionsCorrect}
              </p>
              <p className="text-xs text-gray-500">Incorrect</p>
            </div>
          </div>
        </div>
      </div>

      {/* Qubits Summary */}
      <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-5 text-white">
        <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
          <Flame className="w-5 h-5" />
          Qubits Practice
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/20 backdrop-blur rounded-xl p-3 text-center">
            <p className="text-2xl font-bold">{qubitsDashboard.overallAccuracy}%</p>
            <p className="text-xs text-white/80">Accuracy</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-xl p-3 text-center">
            <p className="text-2xl font-bold">{qubitsDashboard.streak}</p>
            <p className="text-xs text-white/80">Day Streak</p>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-white/80">Questions Practiced</span>
          <span className="font-semibold">{qubitsDashboard.totalQuestionsAttempted}</span>
        </div>
      </div>

      {/* Certificate Status */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'p-3 rounded-xl',
              progress.certificateEarned ? 'bg-green-100' : 'bg-gray-100'
            )}
          >
            <Award
              className={cn(
                'w-6 h-6',
                progress.certificateEarned ? 'text-green-600' : 'text-gray-400'
              )}
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {progress.certificateEarned ? 'Certificate Earned!' : 'Certificate Locked'}
            </p>
            <p className="text-xs text-gray-500">
              {progress.certificateEarned
                ? 'Download your certificate'
                : `Complete ${100 - progress.overallProgress}% more to unlock`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatItem({
  icon: Icon,
  label,
  value,
  color,
  bgColor,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
  bgColor: string;
}) {
  return (
    <div className={cn('p-3 rounded-xl', bgColor)}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className={cn('w-4 h-4', color)} />
        <span className="text-xs text-gray-500">{label}</span>
      </div>
      <p className="text-lg font-bold text-gray-900">{value}</p>
    </div>
  );
}
