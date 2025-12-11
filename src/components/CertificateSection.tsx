'use client';

import React from 'react';
import {
  Award,
  Download,
  Share2,
  CheckCircle,
  Lock,
  ExternalLink,
  Calendar,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LearnerProgress, Course, LearnerProfile } from '@/types';

interface CertificateSectionProps {
  progress: LearnerProgress;
  course: Course;
  learner: LearnerProfile;
}

export default function CertificateSection({
  progress,
  course,
  learner,
}: CertificateSectionProps) {
  const requirements = [
    {
      label: 'Complete all modules',
      completed: progress.modulesCompleted >= progress.totalModules,
      current: progress.modulesCompleted,
      total: progress.totalModules,
    },
    {
      label: 'Pass all quizzes',
      completed: progress.quizzesPassed >= progress.totalQuizzes,
      current: progress.quizzesPassed,
      total: progress.totalQuizzes,
    },
    {
      label: `Achieve ${course.passingScore}% average score`,
      completed: progress.averageScore >= course.passingScore,
      current: progress.averageScore,
      total: course.passingScore,
      isPercentage: true,
    },
  ];

  const allRequirementsMet = requirements.every((r) => r.completed);

  return (
    <div className="space-y-6">
      {/* Certificate Card */}
      <div
        className={cn(
          'rounded-2xl border-2 p-8 text-center',
          allRequirementsMet
            ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
            : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200'
        )}
      >
        <div
          className={cn(
            'w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center',
            allRequirementsMet ? 'bg-green-100' : 'bg-gray-200'
          )}
        >
          {allRequirementsMet ? (
            <Award className="w-10 h-10 text-green-600" />
          ) : (
            <Lock className="w-10 h-10 text-gray-400" />
          )}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {allRequirementsMet ? 'Certificate Earned!' : 'Certificate Locked'}
        </h2>

        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          {allRequirementsMet
            ? `Congratulations, ${learner.name}! You've successfully completed the ${course.name} course.`
            : `Complete all requirements below to unlock your certificate of completion.`}
        </p>

        {allRequirementsMet ? (
          <div className="flex justify-center gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors">
              <Download className="w-5 h-5" />
              Download Certificate
            </button>
            <button className="flex items-center gap-2 px-6 py-3 border-2 border-green-600 text-green-600 rounded-xl font-medium hover:bg-green-50 transition-colors">
              <Share2 className="w-5 h-5" />
              Share on LinkedIn
            </button>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-600 rounded-xl text-sm">
            <Lock className="w-4 h-4" />
            Complete requirements to unlock
          </div>
        )}
      </div>

      {/* Requirements */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Certificate Requirements
        </h3>

        <div className="space-y-4">
          {requirements.map((req, idx) => (
            <div
              key={idx}
              className={cn(
                'flex items-center gap-4 p-4 rounded-xl border',
                req.completed
                  ? 'bg-green-50 border-green-200'
                  : 'bg-gray-50 border-gray-200'
              )}
            >
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                  req.completed ? 'bg-green-100' : 'bg-gray-200'
                )}
              >
                {req.completed ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <span className="text-sm font-bold text-gray-500">{idx + 1}</span>
                )}
              </div>

              <div className="flex-1">
                <p
                  className={cn(
                    'font-medium',
                    req.completed ? 'text-green-700' : 'text-gray-700'
                  )}
                >
                  {req.label}
                </p>
                <p className="text-sm text-gray-500">
                  {req.isPercentage
                    ? `Current: ${req.current}%`
                    : `${req.current} of ${req.total} completed`}
                </p>
              </div>

              {!req.completed && (
                <div className="flex-shrink-0">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-500 rounded-full"
                      style={{
                        width: `${(req.current / req.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Exam Voucher */}
      {course.examVoucher && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-100 rounded-xl">
              <Award className="w-8 h-8 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">
                {course.examVoucher.examName}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Your exam voucher is included with this course. Schedule your certification exam!
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Expires: {new Date(course.examVoucher.expiryDate).toLocaleDateString()}
                  </span>
                </div>
                <div
                  className={cn(
                    'px-3 py-1 rounded-full text-xs font-medium',
                    course.examVoucher.isRedeemed
                      ? 'bg-green-100 text-green-700'
                      : 'bg-amber-100 text-amber-700'
                  )}
                >
                  {course.examVoucher.isRedeemed ? 'Redeemed' : 'Available'}
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors">
                  View Voucher Code
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-amber-300 text-amber-700 rounded-lg font-medium hover:bg-amber-50 transition-colors">
                  Schedule Exam
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Course Details */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Details</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-500 mb-1">Course Code</p>
            <p className="font-semibold text-gray-900">{course.code}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-500 mb-1">Started</p>
            <p className="font-semibold text-gray-900">
              {new Date(progress.startedAt).toLocaleDateString()}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-500 mb-1">Time Spent</p>
            <p className="font-semibold text-gray-900">{progress.totalTimeSpent}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-500 mb-1">Provider</p>
            <p className="font-semibold text-gray-900">{course.provider}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
