import pg from 'pg';

const { Pool } = pg;

let pool;

export function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required. Copy .env.example to .env and point it at PostgreSQL.');
  }
  pool ??= new Pool({ connectionString: process.env.DATABASE_URL });
  return pool;
}

export async function closePool() {
  if (!pool) return;
  await pool.end();
  pool = undefined;
}
