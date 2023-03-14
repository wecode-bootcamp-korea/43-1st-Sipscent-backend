const appDataSource = require("./dataSource");

const getDetailItem = async (itemId) => {
  return appDataSource.query(
    `SELECT
    i.id AS itemId,
    i.description AS itemDescription,
    item_types.type_name AS itemTypeName,
    categories.category_name AS itemCategory,
    i.image_url AS itemImageUrl,
    ROUND(i.price) AS itemPrice,
    item_sizes.teabag_size AS teabagSize,
    JSON_ARRAYAGG(
      tasting_notes.note_name) AS tastingNotes
    FROM items AS i
    INNER JOIN item_types ON  i.item_type_id=item_types.id
    INNER JOIN categories ON i.category_id=categories.id
    INNER JOIN item_sizes ON i.size_id=item_sizes.id
    INNER JOIN items_tasting_notes ON i.id=items_tasting_notes.item_id
    INNER JOIN tasting_notes ON items_tasting_notes.tasting_note_id=tasting_notes.id
    WHERE i.id=?`,
    [itemId]
  );
};

module.exports = {
  getDetailItem,
};
