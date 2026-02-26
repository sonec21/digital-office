import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const LEADS_FILE = path.join(process.cwd(), 'brain', 'data', 'leads.json');

interface Lead {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  source: string;
  status: string;
  value: number;
  created_at: string;
  notes: string;
}

function readLeads(): Lead[] {
  try {
    const data = fs.readFileSync(LEADS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeLeads(leads: Lead[]): void {
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
}

export async function GET() {
  const leads = readLeads();
  return NextResponse.json(leads);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const leads = readLeads();
    
    // Generate unique ID
    const id = `lead-${Date.now()}`;
    const newLead: Lead = {
      id,
      name: body.name,
      contact: body.contact || '',
      email: body.email,
      phone: body.phone || '',
      source: body.source || 'Website',
      status: body.status || 'new',
      value: parseInt(body.value, 10) || 0,
      created_at: new Date().toISOString(),
      notes: body.notes || '',
    };

    leads.unshift(newLead);
    writeLeads(leads);

    return NextResponse.json(newLead, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    );
  }
}
