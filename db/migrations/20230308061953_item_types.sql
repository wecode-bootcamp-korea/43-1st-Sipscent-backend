-- migrate:up
CREATE TABLE item_types(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  type_name VARCHAR(50) NOT NULL
);
-- migrate:down
DROP TABLE item_types;
