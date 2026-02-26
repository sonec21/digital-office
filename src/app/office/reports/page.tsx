'use client';

import reports from '@/brain/seeds/reports.json';

export default function ReportsPage() {
  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      sales: '💰',
      pipeline: '🔄',
      team: '👥',
      performance: '📊',
    };
    return icons[type] || '📄';
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      ready: 'bg-emerald-100 text-emerald-700',
      scheduled: 'bg-blue-100 text-blue-700',
      draft: 'bg-slate-100 text-slate-600',
    };
    return styles[status] || 'bg-slate-100 text-slate-600';
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Reports</h2>
          <p className="text-sm text-slate-500 mt-1">Analytics and insights</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          + Generate Report
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Report</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{getTypeIcon(report.type)}</span>
                    <span className="font-medium text-slate-900">{report.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600 capitalize">{report.type}</td>
                <td className="px-6 py-4 text-slate-500">{report.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(report.status)}`}>
                    {report.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    {report.status === 'ready' ? 'Download' : 'Schedule'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {reports.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No reports available</p>
        </div>
      )}
    </div>
  );
}
