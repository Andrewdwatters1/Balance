INSERT INTO habits (userid, title, description, startdateformatted, startdate)
VALUES ($1, $2, $3, $4, now());