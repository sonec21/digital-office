import { NextResponse } from 'next/server';
import fs from 'fs';

const SEEDS_DIR = '/root/.openclaw/workspace/digital-office/brain/seeds';

function readJson(filename: string) {
  try {
    const data = fs.readFileSync(`${SEEDS_DIR}/${filename}`, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function getDaysAgo(days: number) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split('T')[0];
}

export async function GET() {
  // Load all data
  const leads = readJson('leads.json');
  const pipeline = readJson('pipeline.json');
  const projects = readJson('projects.json');
  const tasks = readJson('tasks.json');
  const activity = readJson('activity.json');
  const inbox = readJson('inbox.json');

  const today = getToday();
  const today_iso = new Date().toISOString();

  // KPIs
  const leads_today = leads.filter((l: any) => l.created_at?.startsWith(today)).length;
  const leads_7d = leads.filter((l: any) => l.created_at?.split('T')[0] >= getDaysAgo(7)).length;
  
  const open_deals = (pipeline.deals || []).filter((d: any) => d.stage !== 'won' && d.stage !== 'lost');
  const pipeline_value = open_deals.reduce((sum: number, d: any) => sum + (d.value || 0), 0);
  
  const won_30d = (pipeline.deals || []).filter((d: any) => 
    d.stage === 'won' && d.created_at?.split('T')[0] >= getDaysAgo(30)
  );
  const revenue_30d = won_30d.reduce((sum: number, d: any) => sum + (d.value || 0), 0);
  
  const projects_in_progress = (projects || []).filter((p: any) => p.status === 'active').length;
  
  const tasks_done_today = (tasks || []).filter((t: any) => 
    t.status === 'done' && t.updated_at?.startsWith(today)
  ).length;

  // Lead Pipeline
  const stage_summary = (pipeline.stages || []).map((stage: any) => {
    const stage_deals = (pipeline.deals || []).filter((d: any) => d.stage === stage.id);
    return {
      stage: stage.name,
      count: stage_deals.length,
      value: stage_deals.reduce((sum: number, d: any) => sum + (d.value || 0), 0),
    };
  }).sort((a: any, b: any) => b.value - a.value).slice(0, 5);

  // Projects
  const active_projects = (projects || []).filter((p: any) => p.status === 'active')
    .map((p: any) => ({ id: p.id, name: p.name, status: p.status, next_due_at: p.due_date }));
  
  const waiting_projects = (projects || []).filter((p: any) => p.status === 'on-hold')
    .map((p: any) => ({ id: p.id, name: p.name, status: p.status, next_due_at: p.due_date }));
  
  const done_recent = (projects || []).filter((p: any) => p.status === 'completed')
    .map((p: any) => ({ id: p.id, name: p.name, status: p.status, completed_at: p.due_date }));

  // Inbox
  const inbox_data = inbox || { approvals: [], stalled: [], errors: [] };

  // Activity (latest 12)
  const activity_feed = (activity || []).slice(0, 12).map((a: any) => ({
    at: a.timestamp || a.created_at,
    actor: a.user || 'system',
    action: a.type || 'action',
    summary: a.message,
    related_type: 'general',
    related_id: a.id,
  }));

  return NextResponse.json({
    kpis: {
      new_leads_today: leads_today,
      new_leads_7d: leads_7d,
      pipeline_value_open: pipeline_value,
      revenue_won_30d: revenue_30d,
      projects_in_progress,
      tasks_done_today,
    },
    lead_pipeline: stage_summary,
    projects: {
      active: active_projects,
      waiting: waiting_projects,
      done_recent,
    },
    inbox: {
      approvals: inbox_data.approvals || [],
      stalled: inbox_data.stalled || [],
      errors: inbox_data.errors || [],
    },
    activity: activity_feed,
  });
}
