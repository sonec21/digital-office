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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const members = readTeamMembers();
    
    const index = members.findIndex(m => m.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      );
    }

    // Update fields
    members[index] = {
      ...members[index],
      ...body,
      id: members[index].id, // Prevent id override
      created_at: members[index].created_at, // Prevent created_at override
    };

    writeTeamMembers(members);
    return NextResponse.json(members[index]);
  } catch (error) {
    console.error('Error updating team member:', error);
    return NextResponse.json(
      { error: 'Failed to update team member' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const members = readTeamMembers();
    
    const index = members.findIndex(m => m.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      );
    }

    // Soft delete - set status to inactive
    members[index].status = 'inactive';
    writeTeamMembers(members);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting team member:', error);
    return NextResponse.json(
      { error: 'Failed to delete team member' },
      { status: 500 }
    );
  }
}
