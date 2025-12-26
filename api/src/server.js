import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { v4 as uuid } from "uuid";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("combined"));

const PORT = process.env.PORT || 3000;
const SERVICE_NAME = process.env.SERVICE_NAME || "client-demo-api";

// Demo in-memory storage (for portfolio demo).
const items = new Map();

app.get("/health", (req, res) => {
  const dbConnected = true; // demo flag
  res.json({
    status: "ok",
    service: SERVICE_NAME,
    time: new Date().toISOString(),
    db: { connected: dbConnected, lastError: null }
  });
});

// Create
app.post("/items", (req, res) => {
  const { name, price } = req.body ?? {};
  if (!name) return res.status(400).json({ error: "name is required" });

  const id = uuid();
  const item = {
    id,
    name,
    price: Number(price ?? 0),
    createdAt: new Date().toISOString()
  };

  items.set(id, item);
  res.status(201).json(item);
});

// List
app.get("/items", (req, res) => {
  res.json({ items: Array.from(items.values()) });
});

// Get by id
app.get("/items/:id", (req, res) => {
  const item = items.get(req.params.id);
  if (!item) return res.status(404).json({ error: "not found" });
  res.json(item);
});

// Update
app.put("/items/:id", (req, res) => {
  const item = items.get(req.params.id);
  if (!item) return res.status(404).json({ error: "not found" });

  const { name, price } = req.body ?? {};
  const updated = {
    ...item,
    name: name ?? item.name,
    price: price === undefined ? item.price : Number(price),
    updatedAt: new Date().toISOString()
  };

  items.set(req.params.id, updated);
  res.json(updated);
});

// Delete
app.delete("/items/:id", (req, res) => {
  const ok = items.delete(req.params.id);
  res.json({ deleted: ok });
});

app.listen(PORT, () => {
  console.log(`[${SERVICE_NAME}] listening on :${PORT}`);
});

