import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';

const DATA_FILE = '/root/.openclaw/workspace/digital-office/brain/data/tasks.json';

function readTasks() {
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

function writeTasks(tasks: any[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const tasks = readTasks();
    const taskIndex = tasks.findIndex((t: any) => t.id === id);
    
    if (taskIndex === -1) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    
    const now = new Date().toISOString();
    
    // Update allowed fields
    const updates = {
      ...(body.title !== undefined && { title: body.title }),
      ...(body.description !== undefined && { description: body.description }),
      ...(body.status !== undefined && { status: body.status }),
      ...(body.assignee_agent !== undefined && { assignee_agent: body.assignee_agent }),
      ...(body.due_at !== undefined && { due_at: body.due_at }),
      updated_at: now,
    };
    
    tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
    writeTasks(tasks);
    
    return NextResponse.json({ task: tasks[taskIndex] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    let tasks = readTasks();
    const taskIndex = tasks.findIndex((t: any) => t.id === id);
    
    if (taskIndex === -1) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    
    tasks = tasks.filter((t: any) => t.id !== id);
    writeTasks(tasks);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}
