'use client';

import activity from '@/brain/seeds/activity.json';

export default function ActivityPage() {
  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      lead_created: '🎯',
      deal_moved: '🔄',
      project_completed: '✅',
      automation_triggered: '⚡',
      meeting_scheduled: '📅',
    };
    return icons[type] || '📌';
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Activity</h2>
          <p className="text-sm text-slate-500 mt-1">Recent system activity</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
          {activity.map((item) => (
            <div key={item.id} className="p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-start gap-4">
                <span className="text-2xl">{getTypeIcon(item.type)}</span>
                <div className="flex-1">
                  <p className="text-slate-900 font-medium">{item.message}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-slate-500">{item.user}</span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500">
                      {new Date(item.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activity.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No activity yet</p>
        </div>
      )}
    </div>
  );
}
