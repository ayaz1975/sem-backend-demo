## Client Backend Demo (API + Worker + Cron)

This is a simple portfolio/demo backend to deploy on AWS ECS Fargate.

### Components
- API (Express): /health + CRUD /items
- Worker: background job simulator
- Cron: short-lived task for EventBridge schedule

### Endpoints
- GET /health
- POST /items
- GET /items
- GET /items/:id
- PUT /items/:id
- DELETE /items/:id

