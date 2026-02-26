# CHANGE FREEZE - Incident Response

**Date:** 2025-02-25  
**Status:** ACTIVE  
**Issued By:** Nick (Business Operations Manager)

---

## Incident Summary

The Digital Office UI at office.chatobot.cloud was significantly degraded after recent changes. The previously working "nice UI" (with sidebar showing WorkspaceOffice, Leads, Pipeline, Projects, Tasks, Automations, Calendar) was lost. The current Next.js deployment shows a minimal/placeholder UI.

**Root Cause:** Unknown - likely a deployment mismatch or old deployment was replaced.

---

## Freeze Rules

### CLAW (System Admin)
- **STATUS:** READ-ONLY
- **ALLOWED:** Analysis, recommendations, investigation
- **PROHIBITED:** No file edits, no config changes, no deployments

### BERNARD (Developer)
- **STATUS:** ACTIVE - Restoration Lead
- **ALLOWED:** 
  - Modify code/config to restore UI
  - Investigate and restore lost functionality
  - Deploy fixes
- **PROHIBITED:** Changes unrelated to restoration

### Other Agents (Vale, Gumbo, Assistant)
- **STATUS:** STANDBY
- **ALLOWED:** Analysis only
- **PROHIBITED:** No modifications until freeze lifted

---

## Goals

1. **Restore the working "nice UI"** - Find and restore the previous dashboard with proper sidebar
2. **Identify root cause** - Understand what changed/broke
3. **Verify stability** - Ensure UI works before lifting freeze

---

## Investigation Notes

- The Next.js workspace code shows minimal placeholder pages
- Production at office.chatobot.cloud was serving different content previously
- Possible old deployment source needs to be identified
- May need to rebuild from design specs or backup

---

## Escalation Path

If Bernard cannot resolve within 2 hours:
- Escalate to Owner for backup/source access
- Request access to previous deployment logs

---

## Freeze Lifting

This freeze will be lifted when:
1. The "nice UI" is restored and verified working
2. All sidebar items (Dashboard, Activity, Team, Tasks, Conversations, Training, Reports) are functional
3. Owner approves the restoration

**Approver:** Nick  
**Review Date:** 2025-02-25 (24 hours)

---

*This document governs all code changes until lifted by Nick or Owner.*
