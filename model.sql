-- Erase data
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS pickups;
DROP TABLE IF EXISTS foods;

-- Create tables
CREATE TABLE users
(
    id SERIAL,
    username VARCHAR(30),
    type VARCHAR(10),
    password VARCHAR(128),
    PRIMARY KEY(id)
);

CREATE TABLE pickups
(
    id SERIAL,
    donor_id INT,
    bank_id INT,
    PRIMARY KEY(id)
);

CREATE TABLE foods
(
    id SERIAL,
    pickup_id INT,
    description VARCHAR(100),
    expiry VARCHAR(200),
    quantity VARCHAR(100),
    PRIMARY KEY(id)
);


-- Create FKs
-- ALTER TABLE pickups
--     ADD    FOREIGN KEY (donor_id)
--     REFERENCES users(id)
--     MATCH SIMPLE
-- ;
--
-- ALTER TABLE pickups
--     ADD    FOREIGN KEY (bank_id)
--     REFERENCES users(id)
--     MATCH SIMPLE
-- ;
--
-- ALTER TABLE foods
--     ADD    FOREIGN KEY (pickup_id)
--     REFERENCES pickups(id)
--     MATCH SIMPLE
-- ;


-- Create Indexes
INSERT INTO users (username, type, password) VALUES ('donor', 'DONOR', 'a');
INSERT INTO users (username, type, password) VALUES ('bank', 'BANK', 'a');

INSERT INTO pickups (donor_id, bank_id) Values (1, 2);
INSERT INTO pickups (donor_id) Values (1);

INSERT INTO foods (pickup_id, description, quantity) VALUES (1, 'Potatoes', '20lbs');
INSERT INTO foods (pickup_id, description, quantity) VALUES (1, 'Bread', '15 loaves');
INSERT INTO foods (pickup_id, description, quantity) VALUES (2, 'Potatoes', '20lbs');
INSERT INTO foods (pickup_id, description, quantity) VALUES (2, 'Bread', '15 loaves');
