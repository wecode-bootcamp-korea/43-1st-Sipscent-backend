-- migrate:up
CREATE TABLE carts(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  item_id INT NOT NULL UNIQUE,
  user_id INT NOT NULL UNIQUE,
  quantity INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT carts_item_id_fkey FOREIGN KEY (item_id) REFERENCES items(id),
  CONSTRAINT carts_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
);
-- migrate:down
DROP TABLE carts;