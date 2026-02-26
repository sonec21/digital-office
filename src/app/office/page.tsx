export default function Dashboard() {
  return (
    <>
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-500 mt-1">Welcome to your Digital Office</p>
      </header>

      <div className="p-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Leads', value: '0', trend: '+0%', icon: '🎯' },
            { label: 'Active Conversations', value: '0', trend: '+0%', icon: '💬' },
            { label: 'Pending Appointments', value: '0', trend: '+0%', icon: '📅' },
            { label: 'Running Agents', value: '0', trend: '+0%', icon: '🤖' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{stat.icon}</span>
                <span className="text-sm text-green-600 font-medium">{stat.trend}</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              + New Lead
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              + New Appointment
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              + New Task
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Leads</h3>
            <p className="text-gray-500 text-sm">No leads yet</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h3>
            <p className="text-gray-500 text-sm">No appointments scheduled</p>
          </div>
        </div>
      </div>
    </>
  );
}
