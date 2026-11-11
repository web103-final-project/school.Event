const textFields = [
  ['title', 'Enter a title.'],
  ['description', 'Enter a description.'],
  ['location', 'Enter a location.'],
  ['host', 'Enter a host.'],
];

function parseTime(value) {
  if (typeof value !== 'string' || value.trim() === '') return null;
  const time = new Date(value);
  return Number.isNaN(time.getTime()) ? null : time;
}

export function validateEvent(input, { categoryIds, now = new Date() }) {
  const errors = {};
  const event = {};

  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { ok: false, errors: { form: 'Submit the event details as JSON.' } };
  }

  for (const [field, message] of textFields) {
    if (typeof input[field] !== 'string' || input[field].trim() === '') errors[field] = message;
    else event[field] = input[field].trim();
  }

  const categoryText = String(input.categoryId ?? '');
  const categoryId = Number(categoryText);
  if (input.categoryId === undefined || input.categoryId === null || input.categoryId === '') {
    errors.categoryId = 'Choose a category.';
  } else if (!/^[1-9]\d*$/.test(categoryText) || !categoryIds.has(categoryId)) {
    errors.categoryId = 'Choose a category from the list.';
  } else {
    event.categoryId = categoryId;
  }

  const startsAt = parseTime(input.startsAt);
  const endsAt = parseTime(input.endsAt);
  if (!startsAt) errors.startsAt = 'Enter a valid start time.';
  else if (startsAt < now) errors.startsAt = 'Start time must be in the future.';
  else event.startsAt = startsAt;

  if (!endsAt) errors.endsAt = 'Enter a valid end time.';
  else event.endsAt = endsAt;

  if (startsAt && endsAt && endsAt <= startsAt) {
    errors.endsAt = 'End time must be after the start time.';
  }

  if (input.imageUrl == null || input.imageUrl === '') event.imageUrl = null;
  else if (typeof input.imageUrl !== 'string') errors.imageUrl = 'Image address must be text.';
  else event.imageUrl = input.imageUrl.trim() || null;

  return { ok: Object.keys(errors).length === 0, errors, event };
}
