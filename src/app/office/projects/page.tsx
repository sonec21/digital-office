import projects from '@/brain/seeds/projects.json';

export default function ProjectsPage() {
  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      planning: 'bg-blue-100 text-blue-800',
      completed: 'bg-gray-100 text-gray-800',
      'on-hold': 'bg-yellow-100 text-yellow-800',
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
          <p className="text-gray-500 mt-1">Manage ongoing client work</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          + New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{project.name}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(project.status)}`}>
                {project.status}
              </span>
            </div>
            
            <p className="text-sm text-gray-500 mb-4">Client: {project.client}</p>
            
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex justify-between text-sm text-gray-500 mt-4">
              <span>Due: {project.due_date}</span>
              <span className="font-medium">${project.budget.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No projects yet. Create your first project to get started!</p>
        </div>
      )}
    </div>
  );
}
