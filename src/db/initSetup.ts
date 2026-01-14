import pool from "./pool.ts"

export async function initDb() {
  const client = await pool.connect()

  try {
    await client.query("BEGIN")

    /* =========================
       SCHEMA
    ========================= */
    await client.query(`
      CREATE SCHEMA IF NOT EXISTS app;
    `)

    /* =========================
       BASE TABLES
    ========================= */

    await client.query(`
      CREATE TABLE IF NOT EXISTS app.genres (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
      );
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS app.keywords (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
      );
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS app.production_companies (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
      );
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS app.production_countries (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        CONSTRAINT production_countries_name_key UNIQUE (name)
      );
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS app.spoken_languages (
        id INTEGER PRIMARY KEY,
        english_name TEXT NOT NULL,
        CONSTRAINT spoken_languages_english_name_key UNIQUE (english_name)
      );
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS app.movies (
        id BIGINT PRIMARY KEY,
        title TEXT NOT NULL,
        overview TEXT,
        poster_path TEXT,
        backdrop_path TEXT,
        release_date DATE,
        vote_average NUMERIC(3,1),
        runtime INTEGER,
        status TEXT,
        budget BIGINT,
        revenue BIGINT,
        tagline TEXT,
        CONSTRAINT movies_id_unique UNIQUE (id)
      );
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS app.persons (
        id BIGINT PRIMARY KEY,
        name TEXT NOT NULL,
        biography TEXT,
        birthday DATE,
        deathday DATE,
        gender SMALLINT,
        known_for_department TEXT,
        place_of_birth TEXT,
        profile_path TEXT,
        also_known_as TEXT[],
        popularity NUMERIC(6,3)
      );
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS app.videos (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        key TEXT NOT NULL,
        site TEXT NOT NULL,
        type TEXT NOT NULL,
        size INTEGER,
        official BOOLEAN,
        published_at TIMESTAMP,
        iso_639_1 TEXT,
        iso_3166_1 TEXT
      );
    `)

    /* =========================
       JUNCTION TABLES
    ========================= */

    await client.query(`
      CREATE TABLE IF NOT EXISTS app.movie_genres (
        movie_id BIGINT NOT NULL,
        genre_id INTEGER NOT NULL,
        PRIMARY KEY (movie_id, genre_id),
        FOREIGN KEY (movie_id) REFERENCES app.movies(id),
        FOREIGN KEY (genre_id) REFERENCES app.genres(id)
      );
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS app.movie_keywords (
        movie_id INTEGER NOT NULL,
        keyword_id INTEGER NOT NULL,
        PRIMARY KEY (movie_id, keyword_id),
        FOREIGN KEY (movie_id) REFERENCES app.movies(id),
        FOREIGN KEY (keyword_id) REFERENCES app.keywords(id)
      );
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS app.movie_cast (
        movie_id INTEGER NOT NULL,
        person_id INTEGER NOT NULL,
        character TEXT NOT NULL,
        profile_path TEXT,
        PRIMARY KEY (movie_id, person_id),
        FOREIGN KEY (movie_id) REFERENCES app.movies(id),
        FOREIGN KEY (person_id) REFERENCES app.persons(id)
      );
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS app.movie_credits (
        movie_id BIGINT NOT NULL,
        person_id BIGINT NOT NULL,
        character TEXT NOT NULL,
        department TEXT,
        job TEXT,
        PRIMARY KEY (movie_id, person_id, character),
        FOREIGN KEY (movie_id) REFERENCES app.movies(id),
        FOREIGN KEY (person_id) REFERENCES app.persons(id)
      );
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS app.movie_production_companies (
        movie_id BIGINT NOT NULL,
        company_id INTEGER NOT NULL,
        PRIMARY KEY (movie_id, company_id),
        FOREIGN KEY (movie_id) REFERENCES app.movies(id),
        FOREIGN KEY (company_id) REFERENCES app.production_companies(id)
      );
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS app.movie_production_countries (
        movie_id BIGINT NOT NULL,
        country_id INTEGER NOT NULL,
        PRIMARY KEY (movie_id, country_id),
        FOREIGN KEY (movie_id) REFERENCES app.movies(id),
        FOREIGN KEY (country_id) REFERENCES app.production_countries(id)
      );
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS app.movie_spoken_languages (
        movie_id BIGINT NOT NULL,
        language_id INTEGER NOT NULL,
        PRIMARY KEY (movie_id, language_id),
        FOREIGN KEY (movie_id) REFERENCES app.movies(id),
        FOREIGN KEY (language_id) REFERENCES app.spoken_languages(id)
      );
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS app.movie_videos (
        movie_id INTEGER NOT NULL,
        video_id TEXT NOT NULL,
        PRIMARY KEY (movie_id, video_id),
        FOREIGN KEY (movie_id) REFERENCES app.movies(id),
        FOREIGN KEY (video_id) REFERENCES app.videos(id)
      );
    `)

    /* =========================
       INDEXES
    ========================= */

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_movies_vote_average
      ON app.movies (vote_average);

      CREATE INDEX IF NOT EXISTS idx_movies_release_date
      ON app.movies (release_date);

      CREATE INDEX IF NOT EXISTS idx_persons_name
      ON app.persons (name);

      CREATE INDEX IF NOT EXISTS idx_persons_popularity
      ON app.persons (popularity);

      CREATE INDEX IF NOT EXISTS idx_movie_credits_person
      ON app.movie_credits (person_id);

      CREATE INDEX IF NOT EXISTS idx_movie_credits_movie
      ON app.movie_credits (movie_id);

      CREATE INDEX IF NOT EXISTS idx_movie_keywords_movie
      ON app.movie_keywords (movie_id);

      CREATE INDEX IF NOT EXISTS idx_movie_keywords_keyword
      ON app.movie_keywords (keyword_id);

      CREATE INDEX IF NOT EXISTS idx_movie_videos_movie
      ON app.movie_videos (movie_id);

      CREATE INDEX IF NOT EXISTS idx_movie_videos_video
      ON app.movie_videos (video_id);
    `)

    await client.query("COMMIT")
    console.log("Database initialized successfully")
  } catch (err) {
    await client.query("ROLLBACK")
    console.error("Database initialization failed", err)
    throw err
  } finally {
    client.release()
  }
}
