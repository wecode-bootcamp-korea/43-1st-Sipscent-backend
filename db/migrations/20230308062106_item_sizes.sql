-- migrate:up
CREATE TABLE item_sizes(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  teabag_size INT NULL
)

-- migrate:down
DROP TABLE item_sizes
