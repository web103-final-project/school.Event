import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { closePool, getPool } from './db.js';
import { schemaSql, seedCategories, seedDemoStudent, seedSampleEvents } from './seed.js';

// Local development and tests only: drops every School.Event table and reseeds it.
// Never run this against the deployed database; use server/init.js there.
export async function resetDatabase() {
  const client = await getPool().connect();
  try {
    await client.query('BEGIN');
    await client.query('DROP TABLE IF EXISTS rsvps, students, events, categories CASCADE');
    await client.query(schemaSql());
    await seedCategories(client);
    await seedSampleEvents(client);
    await seedDemoStudent(client);
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

const entry = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : '';
if (import.meta.url === entry) {
  resetDatabase()
    .then(async () => {
      console.log('Reset the School.Event database.');
      await closePool();
    })
    .catch(async (error) => {
      console.error(error.message);
      await closePool();
      process.exitCode = 1;
    });
}
