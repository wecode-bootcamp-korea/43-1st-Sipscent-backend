-- migrate:up
ALTER TABLE items_tasting_notes MODIFY tasting_note_id INT NULL;

-- migrate:down

