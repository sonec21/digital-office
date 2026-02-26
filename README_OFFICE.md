# Digital Office - Page Guide

## Overview

The Digital Office is your central hub for managing clients, projects, and sales pipelines.

## Pages

| Page | Route | Purpose |
|------|-------|---------|
| **Dashboard** | `/office` | Overview of your business |
| **Leads** | `/office/leads` | Track potential clients |
| **Pipeline** | `/office/pipeline` | Visual kanban of deal stages |
| **Projects** | `/office/projects` | Active client work |
| **Tasks** | `/office/tasks` | Agent task management |
| **Automations** | `/office/automations` | Workflow automation rules |
| **Calendar** | `/office/calendar` | Upcoming meetings & events |
| **Activity** | `/office/activity` | Recent system activity |
| **Team** | `/office/team` | Team members |
| **Conversations** | `/office/conversations` | Chat/convo history |
| **Training** | `/office/training` | Training materials |
| **Reports** | `/office/reports` | Analytics & reports |

## Seed Data

Seed data is located in `/brain/seeds/`. Currently includes:

- `leads.json` - Sample leads
- `pipeline.json` - Deal stages and deals
- `projects.json` - Client projects
- `automations.json` - Automation rules
- `calendar.json` - Scheduled events

## Switching to API

Currently, pages load from JSON seed files. To switch to live API:

1. **Find the API endpoint** - Check `/v1/*` routes in backend
2. **Update the page** - Replace JSON import with fetch call
3. **Add loading states** - Use React useState/useEffect
4. **Handle errors**-friendly error messages

Example:
``` - Show usertypescript
// Before (seed)
import leads from '@/brain/seeds/leads.json';

// After (API)
const leads = await fetch('/v1/leads').then(r => r.json());
```

## Adding New Pages

1. Create folder: `src/app/office/<page-name>/`
2. Add `page.tsx`
3. Add to sidebar in `layout.tsx`
4. Add seed data in `brain/seeds/<page-name>.json`

## Development

```bash
npm run dev    # Development server
npm run build  # Production build
npm run start  # Production server
```
