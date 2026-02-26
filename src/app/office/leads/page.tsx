import leads from '@/brain/seeds/leads.json';

export default function LeadsPage() {
  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      new: 'bg-blue-100 text-blue-700 ring-blue-600/20',
      contacted: 'bg-amber-100 text-amber-700 ring-amber-600/20',
      scheduled: 'bg-violet-100 text-violet-700 ring-violet-600/20',
      won: 'bg-emerald-100 text-emerald-700 ring-emerald-600/20',
      lost: 'bg-slate-100 text-slate-600 ring-slate-500/20',
    };
    return styles[status] || 'bg-slate-100 text-slate-600';
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Leads</h2>
          <p className="text-sm text-slate-500 mt-1">Track and manage your potential clients</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          + Create Lead
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">Company</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">Source</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">Value</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold text-slate-900">{lead.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-slate-900">{lead.contact}</div>
                    <div className="text-xs text-slate-500">{lead.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-600">{lead.source}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-900 font-semibold">${lead.value.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${getStatusBadge(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {leads.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="text-4xl mb-3">🎯</div>
          <p className="text-slate-500 font-medium">No leads yet</p>
          <p className="text-sm text-slate-400 mt-1">Create your first lead to get started!</p>
        </div>
      )}
    </div>
  );
}
