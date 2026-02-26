import projects from '@/brain/seeds/projects.json';

export default function ProjectsPage() {
  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: 'bg-emerald-100 text-emerald-700 ring-emerald-600/20',
      planning: 'bg-blue-100 text-blue-700 ring-blue-600/20',
      completed: 'bg-slate-100 text-slate-600 ring-slate-500/20',
      'on-hold': 'bg-amber-100 text-amber-700 ring-amber-600/20',
    };
    return styles[status] || 'bg-slate-100 text-slate-600';
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Projects</h2>
          <p className="text-sm text-slate-500 mt-1">Manage ongoing client work</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          + New Project
        </button>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 group"
          >
            {/* Card Header */}
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                {project.name}
              </h3>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${getStatusBadge(project.status)}`}>
                {project.status}
              </span>
            </div>
            
            {/* Client */}
            <p className="text-sm text-slate-500 mb-4">{project.client}</p>
            
            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-600">Progress</span>
                <span className="font-semibold text-slate-900">{project.progress}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div 
                  className="bg-blue-600 h-1.5 rounded-full transition-all" 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="flex justify-between items-center pt-3 border-t border-slate-100">
              <div className="text-xs text-slate-500">
                <span className="font-medium">Due:</span> {project.due_date}
              </div>
              <div className="text-sm font-bold text-slate-900">
                ${project.budget.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="text-4xl mb-3">📁</div>
          <p className="text-slate-500 font-medium">No projects yet</p>
          <p className="text-sm text-slate-400 mt-1">Create your first project to get started!</p>
        </div>
      )}
    </div>
  );
}
