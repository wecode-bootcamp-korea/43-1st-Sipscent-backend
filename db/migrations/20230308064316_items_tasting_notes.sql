-- migrate:up
  CREATE TABLE items_tasting_notes(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  item_id INT NOT NULL,
  tasting_note_id INT NULL,
  CONSTRAINT items_tasting_notes_item_id_fkey FOREIGN KEY (item_id) REFERENCES items(id),
  CONSTRAINT items_tasting_notes_tasting_note_id_fkey FOREIGN KEY (tasting_note_id) REFERENCES tasting_notes(id)
);

-- migrate:down
DROP TABLE items_tasting_notes;
