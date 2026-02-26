import automations from '@/brain/seeds/automations.json';

export default function AutomationsPage() {
  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Automations</h2>
          <p className="text-gray-500 mt-1">Workflow automation rules</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          + New Automation
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trigger</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Run</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {automations.map((auto) => (
              <tr key={auto.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{auto.name}</div>
                </td>
                <td className="px-6 py-4">
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">{auto.trigger}</code>
                </td>
                <td className="px-6 py-4 text-gray-600">{auto.action}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(auto.status)}`}>
                    {auto.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm">
                  {auto.last_run ? new Date(auto.last_run).toLocaleString() : 'Never'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {automations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No automations yet. Create your first automation to get started!</p>
        </div>
      )}
    </div>
  );
}
