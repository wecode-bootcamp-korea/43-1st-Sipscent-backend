-- migrate:up
CREATE TABLE orders(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  user_phone_number VARCHAR(30) NOT NULL,
  user_address VARCHAR(100) NOT NULL,
  total_price DECIMAL(8,2) NOT NULL,
  order_number VARCHAR(100) NOT NULL,
  order_status_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT orders_order_status_id_fkey FOREIGN KEY (order_status_id) REFERENCES order_status(id)
);

-- migrate:down
DROP TABLE orders;