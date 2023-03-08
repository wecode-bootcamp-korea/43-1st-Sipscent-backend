-- migrate:up
CREATE TABLE tasting_notes(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  note_name VARCHAR(50) NOT NULL
)
-- migrate:down
DROP TABLE tasting_notes
