# 📑 API Specification — AgentDock Backend

## POST /agents/
Register a new agent.
### Body (JSON):
```json
{
  "name": "GitHubSyncAgent",
  "description": "Syncs PRs",
  "config": { "token": "..." }
}
```
### Response:
```json
{
  "id": "uuid",
  "status": "registered"
}
```

---

## GET /agents/
List all registered agents.
### Response:
```json
[
  {
    "id": "uuid",
    "name": "...",
    "description": "...",
    "config": { ... }
  }
]
```

---

## DELETE /agents/{agent_id}
Deregister an agent.
### Response:
```json
{
  "status": "deregistered"
}
```

---

## POST /tools/
Register a tool.
### Body (JSON):
```json
{
  "name": "GitHubAPI",
  "config": { "token": "..." }
}
```
### Response:
```json
{
  "tool_id": "uuid",
  "status": "registered"
}
```

---

## GET /tools/
List all registered tools.
### Response:
```json
[
  {
    "id": "uuid",
    "name": "...",
    "config": { ... }
  }
]
```

---

## DELETE /tools/{tool_id}
Deregister a tool.
### Response:
```json
{
  "status": "deregistered"
}
```

---

## POST /commands/
Send a natural language command to an agent.
### Body:
```json
{
  "agent_id": "uuid",
  "message": "Summarize latest PR"
}
```
### Response:
```json
{
  "response": "Summary of PR #42..."
}
```

---

## GET /logs/
List recent agent and tool activity logs.
### Response:
```json
[
  {
    "event": "Command executed",
    "agent_id": "uuid",
    "tool_id": null,
    "message": "Summarize latest PR",
    "timestamp": "2025-05-08T15:04:22Z"
  }
]
