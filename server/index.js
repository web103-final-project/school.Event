import { app } from './app.js';

const port = process.env.PORT ?? 3001;

app.listen(port, '127.0.0.1', () => {
  console.log(`School.Event API listening on http://127.0.0.1:${port}`);
});
