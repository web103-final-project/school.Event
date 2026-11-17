import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { closePool, getPool } from './db.js';
import { schemaSql, seedCategories, seedDemoStudent, seedSampleEvents } from './seed.js';

// Safe, repeatable database setup for deployment (`npm run db:init`).
// Unlike server/reset.js, this never drops, truncates, or updates existing rows:
// - creates any missing tables (categories, events, students, rsvps) with their constraints;
// - adds any missing categories and the RSVP demo student;
// - seeds the sample events only when the events table did not exist yet,
//   i.e. on a brand-new database. Later runs never re-add sample events,
//   even if organizers have deleted them all.
export async function initDatabase() {
  const client = await getPool().connect();
  try {
    await client.query('BEGIN');
    // Serialize concurrent runs (e.g. two instances starting together).
    await client.query('SELECT pg_advisory_xact_lock(hashtext($1))', ['school.event:init']);
    const { rows } = await client.query("SELECT to_regclass('public.events') IS NULL AS fresh");
    const fresh = rows[0].fresh;
    await client.query(schemaSql());
    await seedCategories(client);
    if (fresh) await seedSampleEvents(client);
    await seedDemoStudent(client);
    await client.query('COMMIT');
    return { seededEvents: fresh };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

const entry = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : '';
if (import.meta.url === entry) {
  initDatabase()
    .then(async ({ seededEvents }) => {
      console.log(seededEvents
        ? 'Initialized a new School.Event database with sample events.'
        : 'School.Event database is ready. Existing data was left unchanged.');
      await closePool();
    })
    .catch(async (error) => {
      console.error(`Database initialization failed: ${error.message}`);
      await closePool();
      process.exitCode = 1;
    });
}
