import assert from 'node:assert/strict';
import { once } from 'node:events';
import { after, before, test } from 'node:test';
import { app } from './app.js';

let server;
let baseUrl;

before(async () => {
  server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  });
});

test('health reports that the API is available', async () => {
  const response = await fetch(`${baseUrl}/api/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: 'ok' });
});

test('events lists all six samples with the frontend contract', async () => {
  const response = await fetch(`${baseUrl}/api/events`);
  assert.equal(response.status, 200);
  const events = await response.json();
  assert.deepEqual(events.map(({ title, category, imageUrl }) => [title, category, imageUrl]), [
    ['Club Expo', 'clubs', '/images/club-expo.jpg'],
    ['Guest Lecture: AI & Society', 'academic', '/images/lecture.jpg'],
    ['Fall Career Fair', 'career', '/images/career-fair.jpg'],
    ['Intramural Soccer Finals', 'sports', '/images/soccer.jpg'],
    ['Midnight Pancake Study Break', 'social', '/images/pancakes.jpg'],
    ['Open Mic Night', 'arts', '/images/open-mic.jpg'],
  ]);
  assert.equal(new Set(events.map(({ id }) => id)).size, 6);
  for (const event of events) {
    assert.equal(Number.isInteger(event.id), true);
    for (const field of ['title', 'description', 'category', 'startsAt', 'endsAt', 'location', 'host', 'imageUrl']) {
      assert.equal(typeof event[field], 'string');
      assert.ok(event[field].length > 0);
    }
    assert.equal(new Date(event.startsAt).toISOString(), event.startsAt.replace('Z', '.000Z'));
    assert.equal(new Date(event.endsAt).toISOString(), event.endsAt.replace('Z', '.000Z'));
    assert.ok(Date.parse(event.endsAt) > Date.parse(event.startsAt));
  }
});

test('each detail matches its listed event', async () => {
  const events = await (await fetch(`${baseUrl}/api/events`)).json();
  for (const event of events) {
    const response = await fetch(`${baseUrl}/api/events/${event.id}`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), event);
  }
});

test('unknown and malformed IDs return the event JSON 404', async () => {
  for (const id of ['999', '0', '-1', 'abc', '1abc', '1.0', '01', '1e0', '9007199254740993', '%ZZ', '%E0%A4%A']) {
    const response = await fetch(`${baseUrl}/api/events/${id}`);
    assert.equal(response.status, 404, id);
    assert.deepEqual(await response.json(), { error: 'Event not found.' });
  }
});

test('unknown API routes and write requests return JSON 404', async () => {
  for (const [path, method] of [['/api', 'GET'], ['/api/missing', 'GET'], ['/api/events/1/extra', 'GET'], ['/api/events', 'POST'], ['/api/events/1', 'DELETE']]) {
    const response = await fetch(`${baseUrl}${path}`, { method });
    assert.equal(response.status, 404);
    assert.match(response.headers.get('content-type'), /application\/json/);
    assert.deepEqual(await response.json(), { error: 'API route not found.' });
  }
});
