# 📘 README.md — Project Overview

## AgentDock: Multi-Agent MCP Server with UI & Tool Integrations

AgentDock is an extensible platform for managing intelligent agents through a Model Context Protocol (MCP) server with a clean UI, REST APIs, and LLM-powered natural language interface.

---

## 🚀 Features
- Agent registration with metadata and config
- Natural language interface (Groq-compatible)
- Logs and monitoring dashboard
- REST API-based tool registration
- UI with speech-to-text integration

---

## 🧱 Folder Structure
```
AgentDock/
├── backend/               # FastAPI backend
│   ├── app/
│   ├── alembic/           # DB migrations
│   └── requirements.txt
├── frontend/              # React + Tailwind frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── docker-compose.yml     # Multi-container orchestration
├── README.md              # You're here
└── docs/                  # Diagrams & API reference
    └── api-spec.md        # Detailed route documentation
```

---

## 🐳 How to Run (Docker)
```bash
# One-time setup
docker-compose build

# Start all services
docker-compose up

# Access:
# - Frontend: http://localhost:3000
# - Backend API: http://localhost:8000/docs
```

---

## ⚙️ Configuration
### backend/app/core/config.py
Set environment values or `.env` file:
```python
DATABASE_URL = "postgresql+asyncpg://agentdock:secret@db:5432/agentdock_db"
```

---

## ✅ API Endpoints (see `docs/api-spec.md` for full details)
- `POST /agents/` → register agent
- `GET /agents/` → list agents
- `DELETE /agents/{agent_id}` → remove agent
- `POST /tools/` → register tool
- `GET /tools/` → list tools
- `DELETE /tools/{tool_id}` → remove tool
- `POST /commands/` → natural language command
- `GET /logs/` → monitor logs

---

## 🧠 Sample Natural Language Prompts
- “Summarize latest PR”
- “Sync GitHub issues to Jira”
- “Send alert to Slack when build fails”

---

## 🛠 Technologies
- FastAPI + SQLAlchemy + Alembic
- React + Vite + Tailwind CSS
- Docker & Docker Compose
- PostgreSQL (via asyncpg)

---

## 📦 Contribution
1. Fork the repo
2. Clone locally
3. Submit PRs to `dev` branch

---

## 🏁 Status
✅ Ready for hackathon submission — core features implemented & tested!

---

## 📄 License
MIT
