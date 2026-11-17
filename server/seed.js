import { readFileSync } from 'node:fs';
import { DEMO_STUDENT } from './students.js';

// Shared by server/reset.js (local, destructive) and server/init.js (safe, first-time setup).

export const schemaSql = () => readFileSync(new URL('./schema.sql', import.meta.url), 'utf8');

const categories = [
  ['clubs', 'Clubs'],
  ['academic', 'Academic'],
  ['career', 'Career'],
  ['sports', 'Sports'],
  ['social', 'Social'],
  ['arts', 'Arts'],
];

const samples = [
  ['Club Expo', 'Meet student organizations, explore new interests, and find your campus community at our fall club showcase.', 'clubs', 2, [17, 0], 2, [20, 0], 'Student Union Plaza', 'Student Activities Board', '/images/club-expo.jpg'],
  ['Guest Lecture: AI & Society', 'Join a guest speaker for a conversation about artificial intelligence, ethics, and its impact on everyday life.', 'academic', 3, [22, 0], 3, [23, 30], 'Science Hall Auditorium', 'Department of Computer Science', '/images/lecture.jpg'],
  ['Fall Career Fair', 'Connect with employers, discover internships, and learn about career opportunities. Bring your resume.', 'career', 6, [16, 0], 6, [21, 0], 'Campus Recreation Center', 'Career Services', '/images/career-fair.jpg'],
  ['Intramural Soccer Finals', 'Cheer on the finalists as campus teams compete for the intramural soccer championship.', 'sports', 8, [23, 0], 9, [1, 0], 'Campus Soccer Field', 'Intramural Sports', '/images/soccer.jpg'],
  ['Midnight Pancake Study Break', 'Take a break from studying for free pancakes and a relaxed evening with fellow students.', 'social', 10, [5, 0], 10, [7, 0], 'Student Union Dining Hall', 'Residence Hall Association', '/images/pancakes.jpg'],
  ['Open Mic Night', 'Enjoy student music, poetry, and comedy, or step up to the microphone and share your own performance.', 'arts', 11, [1, 0], 11, [3, 0], 'Campus Coffeehouse', 'Arts Collective', '/images/open-mic.jpg'],
];

function upcoming(dayOffset, hour, minute) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + dayOffset);
  date.setUTCHours(hour, minute, 0, 0);
  if (date.getTime() <= Date.now()) date.setUTCDate(date.getUTCDate() + 1);
  return date;
}

// Adds any missing categories; existing ones are left unchanged.
export async function seedCategories(client) {
  for (const [slug, name] of categories) {
    await client.query('INSERT INTO categories (slug, name) VALUES ($1, $2) ON CONFLICT (slug) DO NOTHING', [slug, name]);
  }
}

// Inserts the six sample events. Callers decide when this is appropriate.
export async function seedSampleEvents(client) {
  for (const [title, description, slug, startDay, startClock, endDay, endClock, location, host, imageUrl] of samples) {
    await client.query(
      `INSERT INTO events (category_id, title, description, location, host, image_url, starts_at, ends_at)
       SELECT id, $2, $3, $4, $5, $6, $7, $8 FROM categories WHERE slug = $1`,
      [slug, title, description, location, host, imageUrl, upcoming(startDay, ...startClock), upcoming(endDay, ...endClock)],
    );
  }
}

// Adds the RSVP demo student if missing; an existing row is left unchanged.
export async function seedDemoStudent(client) {
  await client.query('INSERT INTO students (name, email) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING', [DEMO_STUDENT.name, DEMO_STUDENT.email]);
}
