-- migrate:up
CREATE TABLE items(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  item_type_id INT NOT NULL,
  category_id INT NOT NULL,
  image_url VARCHAR(1000) NOT NULL,
  price DECIMAL(8,2) NOT NULL,
  description VARCHAR(100) NOT NULL,
  size_id INT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT items_item_types_id_fkey FOREIGN KEY (item_type_id) REFERENCES item_types(id),
  CONSTRAINT items_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories(id),
  CONSTRAINT items_size_id_fkey FOREIGN KEY (size_id) REFERENCES item_sizes(id)
);


-- migrate:down
DROP TABLE items
