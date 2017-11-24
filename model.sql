-- Erase data
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS pickups;
DROP TABLE IF EXISTS foods;

-- Create tables
CREATE TABLE users
(
    id SERIAL,
    email VARCHAR(30),
    type VARCHAR(10),
    hash VARCHAR(128),
    salt VARCHAR(16),
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
INSERT INTO users (email, type, salt, hash) VALUES ('donor', 'DONOR', 'fe82bdb4b63e3e64', '5c548478a032ed8cfa5a1540c3df41da3598144b21e41dd3070f23b6b6c42f2017506a0ae3f3f704edc6b77f78f3f0a58e6b17a3aaefd494a5403b95c813f63a');
INSERT INTO users (email, type, salt, hash) VALUES ('bank', 'BANK', 'fe82bdb4b63e3e64', '5c548478a032ed8cfa5a1540c3df41da3598144b21e41dd3070f23b6b6c42f2017506a0ae3f3f704edc6b77f78f3f0a58e6b17a3aaefd494a5403b95c813f63a');
INSERT INTO users (email, type, salt, hash) VALUES ('drk.w.jhnsn@gmail.com', 'DONOR', 'a152c8576b79d3f7', '8a3ee118c5b41233d4def40a45f89db0ca4241c8b7e3fa1924f17a34a743bdf79c521a17be9da3284f87daaa872e202ea8b216795b4c97e2820f43c5c59b6cd7');

INSERT INTO pickups (donor_id, bank_id) Values (1, 2);
INSERT INTO pickups (donor_id) Values (1);

INSERT INTO foods (pickup_id, description, quantity) VALUES (1, 'Potatoes', '20lbs');
INSERT INTO foods (pickup_id, description, quantity) VALUES (1, 'Bread', '15 loaves');
INSERT INTO foods (pickup_id, description, quantity) VALUES (2, 'Potatoes', '20lbs');
INSERT INTO foods (pickup_id, description, quantity) VALUES (2, 'Bread', '15 loaves');
