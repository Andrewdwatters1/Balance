SELECT * FROM events
WHERE user_id = $1
AND event_date = $2
ORDER BY event_time ASC