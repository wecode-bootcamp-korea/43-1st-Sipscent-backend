-- migrate:up
CREATE TABLE order_items(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  item_id INT NOT NULL,
  item_quantity INT NOT NULL,
  order_id INT(100) NOT NULL,
  order_status_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT order_items_item_id_fkey FOREIGN KEY (item_id) REFERENCES items(id),
  CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES orders(id),
  CONSTRAINT orders_items_order_status_id_fkey FOREIGN KEY (order_status_id) REFERENCES order_status(id)
);

-- migrate:down
DROP TABLE order_items;