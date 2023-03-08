-- migrate:up
ALTER TABLE items DROP FOREIGN KEY items_tasting_note_id_fkey;
ALTER TABLE items DROP COLUMN tasting_note_id;

-- migrate:down
