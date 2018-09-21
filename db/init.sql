CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(50),
  lastName VARCHAR(50),
  username VARCHAR(50),
  email VARCHAR(100),
  password TEXT,
  zipcode VARCHAR(10),
  avitar VARCHAR
);  

CREATE TABLE habits (
  id SERIAL PRIMARY KEY,
  userId INTEGER,
  FOREIGN KEY (userId) REFERENCES users(id),
  title VARCHAR(100),
  description VARCHAR,
  dateformatted VARCHAR,
  date VARCHAR,
  type VARCHAR
);

CREATE TABLE habitEvents (
  id SERIAL PRIMARY KEY, 
  habitId INTEGER,
  FOREIGN KEY (habitId) REFERENCES habits(id),
  daysFromStart VARCHAR,
  completed BOOLEAN
);

CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  userId INTEGER,
  FOREIGN KEY (userId) REFERENCES users(id),
  content VARCHAR,
  date TIMESTAMP,
  completed BOOLEAN
);

CREATE TABLE nestedTodos (
  id SERIAL PRIMARY KEY,
  parentTodoId INTEGER,
  FOREIGN KEY (parentTodoId) REFERENCES todos(id),
  userId INTEGER,
  FOREIGN KEY (userId) REFERENCES users(id),
  content VARCHAR,
  date TIMESTAMP,
  completed BOOLEAN
);

CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  userId INTEGER,
  FOREIGN KEY (userId) REFERENCES users(id),
  title VARCHAR, 
  content VARCHAR, 
  date timestamp
);

CREATE TABLE scratchpad (
  id SERIAL PRIMARY KEY,
  userId INTEGER,
  FOREIGN KEY (userId) REFERENCES users(id),
  title VARCHAR, 
  content VARCHAR, 
  date timestamp
);