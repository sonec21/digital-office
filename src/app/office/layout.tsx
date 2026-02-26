import Link from 'next/link';
import { ReactNode } from 'react';

export default function OfficeLayout({ children }: { children: ReactNode }) {
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm overflow-y-auto">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-900">🏢 Stack A</h1>
          <p className="text-sm text-gray-500 mt-1">Digital Office</p>
        </div>
        <nav className="p-3">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                >
                  <span className="text-lg flex-shrink-0">{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
