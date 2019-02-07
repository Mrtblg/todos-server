CREATE DATABASE todos;

\c todos;

CREATE TABLE public.account(
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    pwd TEXT NOT NULL
);

CREATE TYPE task_status AS ENUM ('todo', 'done');
CREATE TABLE public.task(
    id SERIAL PRIMARY KEY,
    title TEXT,
    content TEXT,
    "status" task_status NOT NULL DEFAULT 'todo',
    account_id INT NOT NULL REFERENCES public.account(id)
);

INSERT INTO account VALUES (DEFAULT, 'Martin', 'Martin');
INSERT INTO account VALUES (DEFAULT, 'Paul', 'Paul');

INSERT INTO task VALUES (DEFAULT, 'A Paul task', 'Need to code a lot', 'todo', 2);
INSERT INTO task VALUES (DEFAULT, 'Code for test', 'Need to code a lot', 'todo', 1);
INSERT INTO task VALUES (DEFAULT, 'Code more', 'Need to code more', 'todo', 1);
INSERT INTO task VALUES (DEFAULT, 'Code a lot', 'Need to code a lot', 'todo', 1);
INSERT INTO task VALUES (DEFAULT, 'Code a 1', 'Need to code 1', 'todo', 1);
INSERT INTO task VALUES (DEFAULT, 'Code a 2', 'Need to code 2', 'todo', 1);
INSERT INTO task VALUES (DEFAULT, 'Code a 3', 'Need to code 3', 'todo', 1);
INSERT INTO task VALUES (DEFAULT, 'Code a 4', 'Need to code 4', 'todo', 1);
INSERT INTO task VALUES (DEFAULT, 'Code a 5', 'Need to code 5', 'todo', 1);
INSERT INTO task VALUES (DEFAULT, 'Code a 6', 'Need to code 6', 'todo', 1);
INSERT INTO task VALUES (DEFAULT, 'Code a 7', 'Need to code 7', 'todo', 1);
INSERT INTO task VALUES (DEFAULT, 'Code a 8', 'Need to code 8', 'todo', 1);
INSERT INTO task VALUES (DEFAULT, 'Code a 9', 'Need to code 9', 'todo', 1);
INSERT INTO task VALUES (DEFAULT, 'Code a 10', 'Need to code 10', 'todo', 1);
INSERT INTO task VALUES (DEFAULT, 'Code a 11', 'Need to code 11', 'todo', 1);
INSERT INTO task VALUES (DEFAULT, 'Code a 12', 'Need to code 12', 'todo', 1);
INSERT INTO task VALUES (DEFAULT, 'Code a 13', 'Need to code 13', 'todo', 1);
