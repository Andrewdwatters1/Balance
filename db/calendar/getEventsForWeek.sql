ALTER TABLE events ALTER COLUMN event_date_as_date TYPE DATE 
using to_date(event_date, 'YYYY-MM-DD');

SELECT * FROM events
WHERE user_id = $1 AND
event_importance = 'hi' AND
event_date_as_date BETWEEN $2 AND $3
OR user_id = $1 AND
event_importance = 'lo' AND
event_date_as_date BETWEEN $2 and $4
ORDER BY event_date_as_date ASC