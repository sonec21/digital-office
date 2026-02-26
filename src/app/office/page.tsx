'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Target, GitMerge, FolderKanban, CheckSquare, 
  AlertCircle, Clock, AlertTriangle, Activity,
  TrendingUp, DollarSign, Users, Zap
} from 'lucide-react';

interface Summary {
  kpis: {
    new_leads_today: number;
    new_leads_7d: number;
    pipeline_value_open: number;
    revenue_won_30d: number;
    projects_in_progress: number;
    tasks_done_today: number;
  };
  lead_pipeline: { stage: string; count: number; value: number }[];
  projects: {
    active: { id: string; name: string; status: string; next_due_at?: string }[];
    waiting: { id: string; name: string; status: string; next_due_at?: string }[];
    done_recent: { id: string; name: string; status: string; completed_at?: string }[];
  };
  inbox: {
    approvals: { id: string; title: string; risk: string; requested_by: string; created_at: string }[];
    stalled: { id: string; title: string; reason: string; last_activity_at: string }[];
    errors: { id: string; title: string; severity: string; created_at: string }[];
  };
  activity: { at: string; actor: string; action: string; summary: string }[];
}

export default function Dashboard() {
  const [data, setData] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'approvals' | 'stalled' | 'errors'>('approvals');

  useEffect(() => {
    fetch('/api/office/summary')
      .then((res) => res.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-64">
        <p className="text-slate-500">Loading dashboard...</p>
      </div>
    );
  }

  const { kpis, lead_pipeline, projects, inbox, activity } = data || {
    kpis: {},
    lead_pipeline: [],
    projects: { active: [], waiting: [], done_recent: [] },
    inbox: { approvals: [], stalled: [], errors: [] },
    activity: [],
  };

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  const formatDate = (date?: string) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatTime = (date?: string) => {
    if (!date) return '';
    return new Date(date).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  };

  const kpiCards = [
    { label: 'Leads Today', value: kpis.new_leads_today, sub: `+${kpis.new_leads_7d} this week`, icon: Target, color: 'blue' },
    { label: 'Pipeline Value', value: formatCurrency(kpis.pipeline_value_open), sub: 'Open deals', icon: GitMerge, color: 'violet' },
    { label: 'Revenue (30d)', value: formatCurrency(kpis.revenue_won_30d), sub: 'Won deals', icon: DollarSign, color: 'emerald' },
    { label: 'Projects Active', value: kpis.projects_in_progress, sub: 'In progress', icon: FolderKanban, color: 'amber' },
    { label: 'Tasks Done Today', value: kpis.tasks_done_today, sub: 'Completed', icon: CheckSquare, color: 'slate' },
  ];

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    violet: 'bg-violet-50 text-violet-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    slate: 'bg-slate-100 text-slate-600',
  };

  return (
    <div className="p-8">
      {/* Header */}
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Home</h2>
        <p className="text-sm text-slate-500 mt-1">Your business at a glance</p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {kpiCards.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <div className={`w-10 h-10 rounded-lg ${colorMap[kpi.color]} flex items-center justify-center mb-3`}>
              <kpi.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
            <p className="text-sm text-slate-500 mt-1">{kpi.label}</p>
            <p className="text-xs text-slate-400 mt-0.5">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Lead Pipeline */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Pipeline</h3>
            <Link href="/office/pipeline" className="text-sm text-blue-600 hover:text-blue-700">View all</Link>
          </div>
          <div className="p-4 space-y-3">
            {lead_pipeline.map((stage) => (
              <div key={stage.stage} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                  <span className="text-sm text-slate-700">{stage.stage}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-slate-900">{stage.count}</span>
                  <span className="text-xs text-slate-500 ml-2">{formatCurrency(stage.value)}</span>
                </div>
              </div>
            ))}
            {lead_pipeline.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-4">No pipeline data</p>
            )}
          </div>
        </div>

        {/* Projects */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Projects</h3>
            <Link href="/office/projects" className="text-sm text-blue-600 hover:text-blue-700">View all</Link>
          </div>
          <div className="p-4 space-y-3">
            {projects.active.slice(0, 3).map((project) => (
              <div key={project.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FolderKanban className="w-4 h-4 text-amber-500" />
                  <span className="text-sm text-slate-700">{project.name}</span>
                </div>
                <span className="text-xs text-slate-500">{project.next_due_at}</span>
              </div>
            ))}
            {projects.waiting.slice(0, 2).map((project) => (
              <div key={project.id} className="flex items-center justify-between opacity-60">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-500">{project.name}</span>
                </div>
                <span className="text-xs text-slate-400">Waiting</span>
              </div>
            ))}
            {projects.active.length === 0 && projects.waiting.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-4">No active projects</p>
            )}
          </div>
        </div>
      </div>

      {/* Manager Inbox */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-8">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-900">Inbox</h3>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-slate-100">
          {[
            { id: 'approvals', label: 'Approvals', count: inbox.approvals.length, icon: AlertCircle },
            { id: 'stalled', label: 'Stalled', count: inbox.stalled.length, icon: Clock },
            { id: 'errors', label: 'Errors', count: inbox.errors.length, icon: AlertTriangle },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.count > 0 && (
                <span className="bg-red-100 text-red-600 text-xs px-1.5 py-0.5 rounded-full">{tab.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-4">
          {activeTab === 'approvals' && (
            <div className="space-y-2">
              {inbox.approvals.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertCircle className={`w-4 h-4 ${item.risk === 'high' ? 'text-red-500' : item.risk === 'medium' ? 'text-amber-500' : 'text-blue-500'}`} />
                    <div>
                      <p className="text-sm font-medium text-slate-900">{item.title}</p>
                      <p className="text-xs text-slate-500">by {item.requested_by}</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">{formatDate(item.created_at)}</span>
                </div>
              ))}
              {inbox.approvals.length === 0 && (
                <p className="text-sm text-slate-400 text-center py-4">No approvals needed</p>
              )}
            </div>
          )}

          {activeTab === 'stalled' && (
            <div className="space-y-2">
              {inbox.stalled.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <div>
                      <p className="text-sm font-medium text-slate-900">{item.title}</p>
                      <p className="text-xs text-slate-500">{item.reason}</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">{formatDate(item.last_activity_at)}</span>
                </div>
              ))}
              {inbox.stalled.length === 0 && (
                <p className="text-sm text-slate-400 text-center py-4">Nothing stalled</p>
              )}
            </div>
          )}

          {activeTab === 'errors' && (
            <div className="space-y-2">
              {inbox.errors.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className={`w-4 h-4 ${item.severity === 'high' ? 'text-red-500' : 'text-amber-500'}`} />
                    <div>
                      <p className="text-sm font-medium text-slate-900">{item.title}</p>
                      <p className="text-xs text-slate-500">Source: {item.source}</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">{formatTime(item.created_at)}</span>
                </div>
              ))}
              {inbox.errors.length === 0 && (
                <p className="text-sm text-slate-400 text-center py-4">No errors</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">Activity</h3>
          <Link href="/office/activity" className="text-sm text-blue-600 hover:text-blue-700">View all</Link>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            {activity.slice(0, 8).map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <Activity className="w-4 h-4 text-slate-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700">
                    <span className="font-medium">{item.actor}</span>
                    {' '}{item.summary}
                  </p>
                  <p className="text-xs text-slate-400">{formatTime(item.at)}</p>
                </div>
              </div>
            ))}
            {activity.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-4">No recent activity</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
