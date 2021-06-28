DROP TABLE IF EXISTS tracks;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      first VARCHAR(255) NOT NULL,
      last VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE tracks(
      id SERIAL PRIMARY KEY,
      track_id INTEGER NOT NULL,
      username VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      duration INTEGER NOT NULL,
      artwork_url VARCHAR(255),
      permalink_url VARCHAR(255),
      userId INTEGER NOT NULL
      
      );