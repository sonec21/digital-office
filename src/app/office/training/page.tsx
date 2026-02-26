'use client';

import training from '@/brain/seeds/training.json';

export default function TrainingPage() {
  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      completed: 'bg-emerald-100 text-emerald-700',
      in_progress: 'bg-blue-100 text-blue-700',
      not_started: 'bg-slate-100 text-slate-600',
    };
    return styles[status] || 'bg-slate-100 text-slate-600';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      completed: 'Completed',
      in_progress: 'In Progress',
      not_started: 'Not Started',
    };
    return labels[status] || status;
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Training</h2>
          <p className="text-sm text-slate-500 mt-1">Learn how to use Digital Office</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {training.map((item) => (
          <div 
            key={item.id} 
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-slate-900">{item.title}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(item.status)}`}>
                {getStatusLabel(item.status)}
              </span>
            </div>
            
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-500">Progress</span>
                <span className="font-medium text-slate-700">{item.progress}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all" 
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Duration: {item.duration}</span>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                {item.progress === 0 ? 'Start' : item.progress === 100 ? 'Review' : 'Continue'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {training.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <p className="text-slate-500">No training modules available</p>
        </div>
      )}
    </div>
  );
}
