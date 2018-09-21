CREATE TABLE events(
    event_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    event_date VARCHAR(10),
    event_formatted_date VARCHAR(20),
    event_time TIME,
    event_importance VARCHAR(2),
    event_name VARCHAR(20),
    event_details VARCHAR(1000),
    event_tod VARCHAR(10)
);