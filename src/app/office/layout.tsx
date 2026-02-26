'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const navItems = [
  { href: '/office', label: 'Dashboard', icon: '📊' },
  { href: '/office/leads', label: 'Leads', icon: '🎯' },
  { href: '/office/pipeline', label: 'Pipeline', icon: '🔄' },
  { href: '/office/projects', label: 'Projects', icon: '📁' },
  { href: '/office/tasks', label: 'Tasks', icon: '📋' },
  { href: '/office/automations', label: 'Automations', icon: '⚡' },
  { href: '/office/calendar', label: 'Calendar', icon: '📅' },
  { href: '/office/activity', label: 'Activity', icon: '👀' },
  { href: '/office/team', label: 'Team', icon: '👥' },
  { href: '/office/conversations', label: 'Conversations', icon: '💬' },
  { href: '/office/training', label: 'Training', icon: '📚' },
  { href: '/office/reports', label: 'Reports', icon: '📈' },
];

export default function OfficeLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 shadow-sm flex flex-col">
        {/* Logo */}
        <div className="p-5 border-b border-slate-100">
          <h1 className="text-xl font-bold text-slate-900">🏢 Stack A</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">Digital Office</p>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/office' && pathname.startsWith(item.href));
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 text-sm ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-medium shadow-sm'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <span className="text-base flex-shrink-0 w-5 text-center">{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        {/* Footer */}
        <div className="p-4 border-t border-slate-100">
          <p className="text-xs text-slate-400">v1.0.0</p>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
