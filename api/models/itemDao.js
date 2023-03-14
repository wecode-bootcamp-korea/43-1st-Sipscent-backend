const appDataSource = require("./dataSource");

const getDetailItem = async (itemId) => {
  return appDataSource.query(
    `SELECT
    i.id,
    i.name,
    categories.category_name AS category_name,
    i.description AS description,
    item_types.type_name AS type_name,
    i.image_url,
    ROUND(i.price) AS price,
    item_sizes.teabag_size AS teabag_size,
    JSON_ARRAYAGG(
    tasting_notes.note_name) AS tasting_notes
    FROM items AS i
    INNER JOIN item_types ON  i.item_type_id=item_types.id
    INNER JOIN categories ON i.category_id=categories.id
    LEFT JOIN item_sizes ON i.size_id=item_sizes.id
    LEFT JOIN items_tasting_notes ON i.id=items_tasting_notes.item_id
    LEFT JOIN tasting_notes ON items_tasting_notes.tasting_note_id=tasting_notes.id
    WHERE i.id=?`,
    [itemId]
  );
};

module.exports = {
  getDetailItem,
};
