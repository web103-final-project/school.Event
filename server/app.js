import express from 'express';
import { events } from './data/events.js';

export const app = express();

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/events', (req, res) => {
  res.json(events);
});

app.get('/api/events/:eventId', (req, res) => {
  const { eventId } = req.params;
  const event = /^[1-9]\d*$/.test(eventId)
    ? events.find((candidate) => String(candidate.id) === eventId)
    : undefined;

  if (!event) {
    return res.status(404).json({ error: 'Event not found.' });
  }

  res.json(event);
});

app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API route not found.' });
});

app.use((error, req, res, next) => {
  if (error instanceof URIError && req.path.startsWith('/api/events/')) {
    return res.status(404).json({ error: 'Event not found.' });
  }

  next(error);
});
