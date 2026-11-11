import { getPool } from './db.js';

const eventSelect = `
  SELECT e.id, e.title, e.description, c.slug, c.id AS category_id,
         e.starts_at, e.ends_at, e.location, e.host, e.image_url
  FROM events e
  JOIN categories c ON c.id = e.category_id
`;

function toIso(value) {
  const iso = new Date(value).toISOString();
  return iso.endsWith('.000Z') ? iso.replace('.000Z', 'Z') : iso;
}

function toEvent(row) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.slug,
    categoryId: row.category_id,
    startsAt: toIso(row.starts_at),
    endsAt: toIso(row.ends_at),
    location: row.location,
    host: row.host,
    imageUrl: row.image_url,
  };
}

export async function listCategories() {
  const { rows } = await getPool().query('SELECT id, slug, name FROM categories ORDER BY id');
  return rows;
}

export async function listEvents({ categoryId = null, sort = 'date_asc' } = {}) {
  const direction = sort === 'date_desc' ? 'DESC' : 'ASC';
  const { rows } = await getPool().query(
    `${eventSelect}
     WHERE ($1::integer IS NULL OR e.category_id = $1)
     ORDER BY e.starts_at ${direction}, e.id ASC`,
    [categoryId],
  );
  return rows.map(toEvent);
}

export async function findEvent(id) {
  const { rows } = await getPool().query(`${eventSelect} WHERE e.id = $1`, [id]);
  return rows[0] ? toEvent(rows[0]) : null;
}

const writeValues = (event) => [
  event.categoryId, event.title, event.description, event.location, event.host,
  event.imageUrl, event.startsAt, event.endsAt,
];

export async function insertEvent(event) {
  const { rows } = await getPool().query(
    `INSERT INTO events (category_id, title, description, location, host, image_url, starts_at, ends_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING id`,
    writeValues(event),
  );
  return findEvent(rows[0].id);
}

export async function updateEvent(id, event) {
  const { rowCount } = await getPool().query(
    `UPDATE events
     SET category_id = $1, title = $2, description = $3, location = $4, host = $5,
         image_url = $6, starts_at = $7, ends_at = $8
     WHERE id = $9`,
    [...writeValues(event), id],
  );
  return rowCount ? findEvent(id) : null;
}

export async function deleteEvent(id) {
  const { rowCount } = await getPool().query('DELETE FROM events WHERE id = $1', [id]);
  return rowCount > 0;
}
