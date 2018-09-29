ALTER TABLE events ALTER COLUMN event_date_as_date TYPE DATE 
using to_date(event_date, 'YYYY-MM-DD');

SELECT * FROM events
WHERE user_id = $1 AND
event_date_as_date BETWEEN $2 AND $3