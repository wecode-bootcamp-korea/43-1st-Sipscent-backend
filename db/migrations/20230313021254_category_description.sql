-- migrate:up
CREATE TABLE category_description
(
    id                   INT           NOT NULL AUTO_INCREMENT PRIMARY KEY,
    category_title       VARCHAR(1000) NOT NULL,
    category_description VARCHAR(1000) NOT NULL,
    item_type_id         INT NULL,
    categories_id        INT NULL,
    CONSTRAINT category_description_item_type_id FOREIGN KEY (item_type_id) REFERENCES item_types (id),
    CONSTRAINT category_description_categories_id FOREIGN KEY (categories_id) REFERENCES categories (id)

);
-- migrate:down
DROP TABLE category_description;


