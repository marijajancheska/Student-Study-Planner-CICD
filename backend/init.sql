CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    deadline DATE,
    completed BOOLEAN DEFAULT FALSE
);

INSERT INTO tasks (title, subject, deadline, completed)
VALUES 
('Finish CI/CD project setup', 'KIII', '2026-06-28', false),
('Practice Macedonian language exercises', 'Macedonian Language', '2026-06-26', false),
('Review information society questions', 'Concepts of Information Society', '2026-06-26', false);