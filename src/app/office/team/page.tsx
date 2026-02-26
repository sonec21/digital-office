'use client';

import team from '@/brain/seeds/team.json';

export default function TeamPage() {
  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-emerald-500' 
      : 'bg-amber-500';
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Team</h2>
          <p className="text-sm text-slate-500 mt-1">Your team members</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          + Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {team.map((member) => (
          <div 
            key={member.id} 
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-semibold">
                {member.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-slate-900">{member.name}</h3>
                  <span className={`w-2 h-2 rounded-full ${getStatusColor(member.status)}`}></span>
                </div>
                <p className="text-sm text-slate-500 mt-1">{member.role}</p>
                <p className="text-xs text-slate-400 mt-2">{member.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {team.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <p className="text-slate-500">No team members yet</p>
        </div>
      )}
    </div>
  );
}
