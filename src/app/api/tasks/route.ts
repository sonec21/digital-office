import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = '/root/.openclaw/workspace/digital-office/brain/data/tasks.json';

function ensureDataFile() {
  if (!fs.existsSync(DATA_FILE)) {
    const seedsFile = '/root/.openclaw/workspace/digital-office/brain/seeds/tasks.json';
    if (fs.existsSync(seedsFile)) {
      fs.copyFileSync(seedsFile, DATA_FILE);
    } else {
      fs.writeFileSync(DATA_FILE, '[]');
    }
  }
}

function readTasks() {
  ensureDataFile();
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

function writeTasks(tasks: any[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

export async function GET() {
  try {
    const tasks = readTasks();
    return NextResponse.json({ tasks });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read tasks' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, assignee_agent, due_at } = body;
    
    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }
    
    const tasks = readTasks();
    const now = new Date().toISOString();
    
    const newTask = {
      id: `task-${Date.now()}`,
      title,
      description: description || null,
      status: 'scheduled',
      assignee_agent: assignee_agent || null,
      due_at: due_at || null,
      created_at: now,
      updated_at: now,
    };
    
    tasks.push(newTask);
    writeTasks(tasks);
    
    return NextResponse.json({ task: newTask });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}
