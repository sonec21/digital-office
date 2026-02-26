'use client';

import Link from 'next/link';
import { Target, GitMerge, FolderKanban, CheckSquare, Users, Calendar, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { label: 'Total Leads', value: '5', trend: '+20%', icon: Target, color: 'blue' },
    { label: 'Active Deals', value: '3', trend: '+15%', icon: GitMerge, color: 'violet' },
    { label: 'Projects', value: '5', trend: '+10%', icon: FolderKanban, color: 'emerald' },
    { label: 'Tasks', value: '12', trend: '+5%', icon: CheckSquare, color: 'amber' },
  ];

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-6">
        <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
        <p className="text-sm text-slate-500 mt-1">Welcome back! Here's what's happening today.</p>
      </header>

      <div className="p-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-${stat.color}-50 flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 text-${stat.color}-600`} />
                  </div>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    {stat.trend}
                  </span>
                </div>
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/office/leads" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              + New Lead
            </Link>
            <Link href="/office/calendar" className="px-4 py-2 bg-white border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
              + New Event
            </Link>
            <Link href="/office/tasks" className="px-4 py-2 bg-white border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
              + New Task
            </Link>
            <Link href="/office/projects" className="px-4 py-2 bg-white border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
              + New Project
            </Link>
          </div>
        </div>

        {/* Recent Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Leads */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Recent Leads</h3>
              <Link href="/office/leads" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View all →
              </Link>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Acme Corporation', status: 'new', value: '$15,000' },
                { name: 'TechStart Inc', status: 'contacted', value: '$8,500' },
                { name: 'Global Dynamics', status: 'scheduled', value: '$25,000' },
              ].map((lead, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <div>
                    <p className="font-medium text-slate-900">{lead.name}</p>
                    <p className="text-xs text-slate-500">{lead.status}</p>
                  </div>
                  <span className="font-semibold text-slate-900">{lead.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Upcoming Events</h3>
              <Link href="/office/calendar" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View all →
              </Link>
            </div>
            <div className="space-y-3">
              {[
                { title: 'Demo with Acme Corp', date: 'Feb 28', time: '10:00' },
                { title: 'Team Standup', date: 'Today', time: '09:00' },
                { title: 'Strategy Review', date: 'Feb 27', time: '14:00' },
              ].map((event, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <div>
                    <p className="font-medium text-slate-900">{event.title}</p>
                    <p className="text-xs text-slate-500">{event.date} at {event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
