export default function TasksPage() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Tasks</h2>
        <p className="text-gray-500">View and manage agent tasks</p>
      </header>
      
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <p className="text-gray-500">No tasks yet</p>
      </div>
    </div>
  );
}
