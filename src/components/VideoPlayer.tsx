'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  MessageCircle,
  CheckCircle,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Lesson, Module } from '@/types';

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: Lesson;
  module: Module;
  courseName: string;
  onComplete: (lessonId: string) => void;
  onProgressUpdate: (lessonId: string, progress: number, position: number) => void;
  onNextLesson?: () => void;
}

export default function VideoPlayer({
  isOpen,
  onClose,
  lesson,
  module,
  courseName,
  onComplete,
  onProgressUpdate,
  onNextLesson,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(lesson.progress || 0);
  const [showCompletion, setShowCompletion] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // Simulate video progress
  useEffect(() => {
    if (!isOpen || !isPlaying || showCompletion) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + 0.5, 100);
        onProgressUpdate(lesson.id, newProgress, Math.floor((newProgress / 100) * 180));

        if (newProgress >= 100) {
          setShowCompletion(true);
          onComplete(lesson.id);
        }

        return newProgress;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying, showCompletion, lesson.id, onComplete, onProgressUpdate]);

  // Countdown for next lesson
  useEffect(() => {
    if (!showCompletion || !onNextLesson) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          onNextLesson();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showCompletion, onNextLesson]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl overflow-hidden w-full max-w-5xl shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cyan-100 text-sm mb-0.5">
                Module {module.number}: {module.title}
              </p>
              <h3 className="font-semibold text-lg">{lesson.title}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Container */}
        <div className="relative bg-gray-900 aspect-video">
          {/* Video Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            {!showCompletion && (
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-20 h-20 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-10 h-10 text-white" />
                ) : (
                  <Play className="w-10 h-10 text-white ml-1" />
                )}
              </button>
            )}
          </div>

          {/* Completion Overlay */}
          {showCompletion && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <div className="bg-white rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl">
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Lesson Complete!
                </h4>
                <p className="text-gray-600 mb-6">
                  Great job! You&apos;ve completed &quot;{lesson.title}&quot;
                </p>

                {onNextLesson && (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-500">
                      Next lesson starts in{' '}
                      <span className="font-bold text-cyan-600">{countdown}</span> seconds
                    </p>
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        Back to Course
                      </button>
                      <button
                        onClick={onNextLesson}
                        className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                      >
                        Next Lesson
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {!onNextLesson && (
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                  >
                    Continue to Quiz
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Ask Trainer Button */}
          <button className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur rounded-full text-gray-700 text-sm font-medium hover:bg-white transition-all shadow-lg">
            <MessageCircle className="w-4 h-4 text-cyan-600" />
            Ask Trainer
          </button>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0">
            <div className="h-1 bg-gray-700">
              <div
                className="h-full bg-cyan-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-900 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <button className="p-2 text-white hover:bg-gray-800 rounded-lg transition-colors">
                <SkipBack className="w-5 h-5" />
              </button>
              <button className="p-2 text-white hover:bg-gray-800 rounded-lg transition-colors">
                <SkipForward className="w-5 h-5" />
              </button>
              <div className="relative group">
                <button className="px-3 py-1.5 bg-gray-800 text-white rounded text-sm font-medium hover:bg-gray-700 transition-colors">
                  {playbackSpeed}x
                </button>
                <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block">
                  <div className="bg-gray-800 rounded-lg p-1 space-y-1">
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                      <button
                        key={speed}
                        onClick={() => setPlaybackSpeed(speed)}
                        className={cn(
                          'block w-full px-3 py-1 text-sm text-left rounded transition-colors',
                          playbackSpeed === speed
                            ? 'bg-cyan-600 text-white'
                            : 'text-white hover:bg-gray-700'
                        )}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <span className="text-white text-sm ml-2">
                {Math.floor((progress / 100) * 180)}s / {lesson.duration}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <button className="p-2 text-white hover:bg-gray-800 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 text-white hover:bg-gray-800 rounded-lg transition-colors">
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
