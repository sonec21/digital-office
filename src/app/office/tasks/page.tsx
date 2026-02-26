'use client';

import { useState } from 'react';
import { Search, Plus, MoreHorizontal, Calendar, User, GripVertical } from 'lucide-react';

// Seed data for initial load
const initialTasks = [
  { id: 'task-001', title: 'Review Q1 pipeline', description: 'Go through all deals and update stages', status: 'in_progress', assignee_agent: 'nick', due_at: '2026-02-28T14:00:00Z', created_at: '2026-02-26T10:00:00Z', updated_at: '2026-02-26T10:00:00Z' },
  { id: 'task-002', title: 'Fix dashboard layout', description: 'Stats cards need better spacing', status: 'queue', assignee_agent: 'bernard', due_at: '2026-02-27T16:00:00Z', created_at: '2026-02-26T09:00:00Z', updated_at: '2026-02-26T09:00:00Z' },
  { id: 'task-003', title: 'Update documentation', description: 'Add new pages to README', status: 'scheduled', assignee_agent: 'gumbo', due_at: '2026-03-01T12:00:00Z', created_at: '2026-02-25T14:00:00Z', updated_at: '2026-02-25T14:00:00Z' },
  { id: 'task-004', title: 'Deploy to production', description: 'Push latest changes live', status: 'done', assignee_agent: 'claw', due_at: '2026-02-26T10:00:00Z', created_at: '2026-02-25T10:00:00Z', updated_at: '2026-02-26T10:00:00Z' },
  { id: 'task-005', title: 'Write unit tests', description: 'Add tests for API routes', status: 'queue', assignee_agent: 'vale', due_at: '2026-02-28T17:00:00Z', created_at: '2026-02-26T11:00:00Z', updated_at: '2026-02-26T11:00:00Z' },
  { id: 'task-006', title: 'Design new landing page', description: 'Create mockups for review', status: 'scheduled', assignee_agent: 'vale', due_at: '2026-03-05T15:00:00Z', created_at: '2026-02-26T08:00:00Z', updated_at: '2026-02-26T08:00:00Z' },
];

type TaskStatus = 'scheduled' | 'queue' | 'in_progress' | 'done';

const COLUMNS: { id: TaskStatus; title: string; color: string }[] = [
  { id: 'scheduled', title: 'Scheduled', color: 'bg-violet-500' },
  { id: 'queue', title: 'Queue', color: 'bg-amber-500' },
  { id: 'in_progress', title: 'In Progress', color: 'bg-blue-500' },
  { id: 'done', title: 'Done', color: 'bg-emerald-500' },
];

const AGENTS = [
  { id: 'all', name: 'All Agents' },
  { id: 'nick', name: 'Nick' },
  { id: 'bernard', name: 'Bernard' },
  { id: 'vale', name: 'Vale' },
  { id: 'claw', name: 'Claw' },
  { id: 'gumbo', name: 'Gumbo' },
];

interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  assignee_agent?: string;
  due_at?: string;
  created_at: string;
  updated_at: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks as Task[]);
  const [search, setSearch] = useState('');
  const [agentFilter, setAgentFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', assignee_agent: '', due_at: '' });
  const [draggedTask, setDraggedTask] = useState<string | null>(null);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesAgent = agentFilter === 'all' || task.assignee_agent === agentFilter;
    return matchesSearch && matchesAgent;
  });

  const getTasksByStatus = (status: TaskStatus) => filteredTasks.filter((t) => t.status === status);

  const totalTasks = tasks.length;
  const activeTasks = tasks.filter((t) => t.status === 'in_progress' || t.status === 'queue').length;

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId);
  };

  const handleDragOver = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, newStatus: TaskStatus) => {
    e.preventDefault();
    if (!draggedTask) return;

    const task = tasks.find((t) => t.id === draggedTask);
    if (!task || task.status === newStatus) {
      setDraggedTask(null);
      return;
    }

    // Optimistic update
    setTasks((prev) => prev.map((t) => (t.id === draggedTask ? { ...t, status: newStatus, updated_at: new Date().toISOString() } : t)));
    setDraggedTask(null);

    // Persist
    try {
      await fetch(`/api/tasks/${draggedTask}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  const handleCreateTask = async () => {
    if (!newTask.title) return;

    const task = {
      title: newTask.title,
      description: newTask.description || null,
      assignee_agent: newTask.assignee_agent || null,
      due_at: newTask.due_at || null,
    };

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      const data = await res.json();
      setTasks((prev) => [...prev, data.task]);
      setShowCreateModal(false);
      setNewTask({ title: '', description: '', assignee_agent: '', due_at: '' });
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  const getAgentName = (id?: string) => AGENTS.find((a) => a.id === id)?.name || 'Unassigned';

  const formatDueDate = (date?: string) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="p-8 h-[calc(100vh-2rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Tasks</h2>
          <p className="text-sm text-slate-500 mt-1">{activeTasks} active · {totalTasks} total</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Task
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6 flex-shrink-0">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={agentFilter}
          onChange={(e) => setAgentFilter(e.target.value)}
          className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {AGENTS.map((agent) => (
            <option key={agent.id} value={agent.id}>{agent.name}</option>
          ))}
        </select>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto flex-1 pb-4">
        {COLUMNS.map((column) => {
          const columnTasks = getTasksByStatus(column.id);
          return (
            <div
              key={column.id}
              className="flex-shrink-0 w-72"
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <div className={`rounded-t-lg border-t-4 ${column.color} px-4 py-3 bg-slate-50`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900 text-sm">{column.title}</h3>
                  <span className="text-xs font-medium text-slate-500 bg-white px-2 py-0.5 rounded-full">
                    {columnTasks.length}
                  </span>
                </div>
              </div>
              <div className="bg-slate-100/80 rounded-b-lg p-2 min-h-[300px]">
                {columnTasks.length === 0 ? (
                  <div className="flex items-center justify-center h-24 text-xs text-slate-400">
                    No tasks
                  </div>
                ) : (
                  columnTasks.map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={() => handleDragStart(task.id)}
                      className="bg-white rounded-lg border border-slate-200 shadow-sm p-3 mb-2 hover:shadow-md transition-all cursor-grab"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-slate-900 text-sm flex-1">{task.title}</h4>
                        <GripVertical className="w-4 h-4 text-slate-300 flex-shrink-0" />
                      </div>
                      <div className="flex items-center gap-2">
                        {task.assignee_agent ? (
                          <span className="inline-flex items-center gap-1 text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded">
                            <User className="w-3 h-3" />
                            {getAgentName(task.assignee_agent)}
                          </span>
                        ) : null}
                        {task.due_at && (
                          <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                            <Calendar className="w-3 h-3" />
                            {formatDueDate(task.due_at)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Create New Task</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Task title"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Optional description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Assignee</label>
                  <select
                    value={newTask.assignee_agent}
                    onChange={(e) => setNewTask({ ...newTask, assignee_agent: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Unassigned</option>
                    {AGENTS.filter((a) => a.id !== 'all').map((agent) => (
                      <option key={agent.id} value={agent.id}>{agent.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
                  <input
                    type="datetime-local"
                    value={newTask.due_at}
                    onChange={(e) => setNewTask({ ...newTask, due_at: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTask}
                disabled={!newTask.title}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
