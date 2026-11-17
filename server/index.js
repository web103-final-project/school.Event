import { app } from './app.js';

const port = Number(process.env.PORT) || 3001;
// Render (and other hosts) route traffic to 0.0.0.0; locally, stay on loopback.
const production = process.env.NODE_ENV === 'production' || process.env.RENDER === 'true';
const host = process.env.HOST ?? (production ? '0.0.0.0' : '127.0.0.1');

app.listen(port, host, () => {
  console.log(`School.Event listening on http://${host}:${port}`);
});
