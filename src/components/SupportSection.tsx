'use client';

import React, { useState } from 'react';
import {
  MessageCircle,
  Phone,
  Mail,
  Star,
  Clock,
  Send,
  User,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Trainer } from '@/types';

interface SupportSectionProps {
  trainer: Trainer;
}

export default function SupportSection({ trainer }: SupportSectionProps) {
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle message submission
    console.log('Message sent:', { subject, message });
    setMessage('');
    setSubject('');
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-cyan-600" />
        Ask Your Trainer
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trainer Info */}
        <div>
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center text-white text-xl font-semibold flex-shrink-0">
              {trainer.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{trainer.name}</h3>
              <p className="text-sm text-gray-500">{trainer.specialization}</p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-sm font-medium text-gray-700">{trainer.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Responds {trainer.responseTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Options */}
          <div className="space-y-3">
            <a
              href={`mailto:${trainer.email}`}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-cyan-300 hover:bg-cyan-50/50 transition-all"
            >
              <div className="p-2 bg-cyan-100 rounded-lg">
                <Mail className="w-4 h-4 text-cyan-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Email</p>
                <p className="text-xs text-gray-500">{trainer.email}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </a>

            {trainer.phone && (
              <a
                href={`tel:${trainer.phone}`}
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-cyan-300 hover:bg-cyan-50/50 transition-all"
              >
                <div className="p-2 bg-green-100 rounded-lg">
                  <Phone className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Phone</p>
                  <p className="text-xs text-gray-500">{trainer.phone}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </a>
            )}

            <a
              href="#"
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-cyan-300 hover:bg-cyan-50/50 transition-all"
            >
              <div className="p-2 bg-purple-100 rounded-lg">
                <HelpCircle className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Help Center</p>
                <p className="text-xs text-gray-500">Browse FAQs and guides</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </a>
          </div>
        </div>

        {/* Message Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="What is your question about?"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="Type your question here... Be as specific as possible for a faster response."
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={!subject.trim() || !message.trim()}
              className={cn(
                'w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all',
                subject.trim() && message.trim()
                  ? 'bg-cyan-600 text-white hover:bg-cyan-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              )}
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-3">
            Typical response time: {trainer.responseTime}
          </p>
        </div>
      </div>
    </div>
  );
}
