import automations from '@/brain/seeds/automations.json';

export default function AutomationsPage() {
  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? 'bg-emerald-100 text-emerald-700 ring-emerald-600/20' 
      : 'bg-slate-100 text-slate-600 ring-slate-500/20';
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Automations</h2>
          <p className="text-sm text-slate-500 mt-1">Workflow automation rules</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          + New Automation
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">Trigger</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">Action</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">Last Run</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {automations.map((auto) => (
                <tr key={auto.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold text-slate-900">{auto.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-700 font-mono">{auto.trigger}</code>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-600">{auto.action}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${getStatusBadge(auto.status)}`}>
                      {auto.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {auto.last_run ? (
                      <span className="text-xs">
                        {new Date(auto.last_run).toLocaleDateString()}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">Never</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {automations.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="text-4xl mb-3">⚡</div>
          <p className="text-slate-500 font-medium">No automations yet</p>
          <p className="text-sm text-slate-400 mt-1">Create your first automation to get started!</p>
        </div>
      )}
    </div>
  );
}
