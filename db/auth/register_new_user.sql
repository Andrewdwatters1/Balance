INSERT INTO users(firstname, lastname, username, email, password, avitar, zipcode)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING*;