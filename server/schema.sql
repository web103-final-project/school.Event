CREATE TABLE categories (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  name text NOT NULL UNIQUE
);

CREATE TABLE events (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  category_id integer NOT NULL REFERENCES categories (id),
  title text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  host text NOT NULL,
  image_url text,
  starts_at timestamptz NOT NULL,
  ends_at timestamptz NOT NULL,
  CONSTRAINT events_end_after_start CHECK (ends_at > starts_at)
);
