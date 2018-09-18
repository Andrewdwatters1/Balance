CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(50),
  lastName VARCHAR(50),
  username VARCHAR(50),
  email VARCHAR(100),
  password VARCHAR(25),
  zipcode  VARCHAR(10),
  avitar VARCHAR
);

CREATE TABLE habits (
  id SERIAL PRIMARY KEY,
  userId INTEGER,
  FOREIGN KEY (userId) REFERENCES users(id),
  title VARCHAR(100),
  description VARCHAR,
  startDate TIMESTAMP
);

CREATE TABLE habitEvents (
  id SERIAL PRIMARY KEY, 
  habitId INTEGER,
  FOREIGN KEY (habitId) REFERENCES habits(id),
  date TIMESTAMP,
  completed BOOLEAN
);