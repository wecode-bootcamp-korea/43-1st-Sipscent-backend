-- migrate:up
CREATE TABLE items(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  item_type_id INT NOT NULL,
  category_id INT NOT NULL,
  image_url VARCHAR(1000) NOT NULL,
  price DECIMAL(8,2) NOT NULL,
  description VARCHAR(100) NOT NULL,
  size INT NULL,
  tasting_note_id INT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT items_item_type_id_fkey FOREIGN KEY (item_type_id) REFERENCES item_type(id),
  CONSTRAINT items_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories(id),
  CONSTRAINT items_tasting_note_id_fkey FOREIGN KEY (tasting_note_id) REFERENCES tasting_notes(id)
);


-- migrate:down
DROP TABLE items
