'use client';

import React from 'react';
import {
  FileText,
  Video,
  Link as LinkIcon,
  Beaker,
  Download,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Resource } from '@/types';

interface ResourcesSectionProps {
  resources: Resource[];
}

export default function ResourcesSection({ resources }: ResourcesSectionProps) {
  const getIcon = (type: Resource['type']) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'video':
        return <Video className="w-5 h-5 text-blue-500" />;
      case 'link':
        return <LinkIcon className="w-5 h-5 text-green-500" />;
      case 'lab':
        return <Beaker className="w-5 h-5 text-purple-500" />;
      case 'download':
        return <Download className="w-5 h-5 text-cyan-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTypeLabel = (type: Resource['type']) => {
    switch (type) {
      case 'pdf':
        return 'PDF Document';
      case 'video':
        return 'Video';
      case 'link':
        return 'External Link';
      case 'lab':
        return 'Interactive Lab';
      case 'download':
        return 'Download';
      default:
        return 'Resource';
    }
  };

  const getActionButton = (resource: Resource) => {
    switch (resource.type) {
      case 'pdf':
      case 'download':
        return (
          <button className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm font-medium hover:bg-cyan-700 transition-colors">
            <Download className="w-4 h-4" />
            Download
          </button>
        );
      case 'lab':
        return (
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
            <Beaker className="w-4 h-4" />
            Launch Lab
          </button>
        );
      default:
        return (
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
            Open
            <ExternalLink className="w-4 h-4" />
          </button>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-amber-500" />
        Additional Learning Resources
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((resource) => (
          <a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex items-start gap-4 p-4 border rounded-xl transition-all group',
              'border-gray-200 hover:border-cyan-300 hover:bg-cyan-50/50 hover:shadow-md'
            )}
          >
            <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-white transition-colors flex-shrink-0">
              {getIcon(resource.type)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-gray-900 group-hover:text-cyan-600 transition-colors truncate">
                  {resource.title}
                </h3>
                {resource.isNew && (
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full flex-shrink-0">
                    New
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{resource.description}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs text-gray-400">{getTypeLabel(resource.type)}</span>
                {resource.size && (
                  <span className="text-xs text-gray-400">• {resource.size}</span>
                )}
              </div>
            </div>

            <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              {getActionButton(resource)}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
