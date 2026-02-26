import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const TEAMS_FILE = path.join(process.cwd(), 'brain', 'data', 'teams.json');

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
  notes?: string;
}

function readTeamMembers(): TeamMember[] {
  try {
    const data = fs.readFileSync(TEAMS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeTeamMembers(members: TeamMember[]): void {
  const dir = path.dirname(TEAMS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(TEAMS_FILE, JSON.stringify(members, null, 2));
}

export async function GET() {
  const members = readTeamMembers();
  return NextResponse.json(members);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const members = readTeamMembers();
    const id = `team-${Date.now()}`;
    const newMember: TeamMember = {
      id,
      name: body.name,
      email: body.email,
      role: body.role || 'Staff',
      status: body.status || 'active',
      created_at: new Date().toISOString(),
      notes: body.notes || '',
    };

    members.unshift(newMember);
    writeTeamMembers(members);

    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    console.error('Error creating team member:', error);
    return NextResponse.json(
      { error: 'Failed to create team member' },
      { status: 500 }
    );
  }
}
