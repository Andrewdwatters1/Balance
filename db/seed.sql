CREATE TABLE todoz (
  id SERIAL PRIMARY KEY,
  user REFERENCES userz(id),
  content VARCHAR,
  startDate TIMESTAMP,
  completed BOOLEAN,
);