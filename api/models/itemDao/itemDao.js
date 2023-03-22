const appDataSource = require("../dataSource");
const {ItemQueryBuilder} = require('./itemQueryBuilder');

const CATEGORY_ID = Object.freeze({
    floral: 1,
    herbal: 2,
    citrus: 3,
});

const TYPE_ID = Object.freeze({
    teabags: 1,
    teacups: 2,
});

const getTeabags = async (limit, offset, sorting, tasting_notes, price, category, itemType) => {
    const filterQuery = new ItemQueryBuilder(
        limit, offset, sorting, tasting_notes, price, category, itemType
    ).build();

    const itemData = await appDataSource.query(`
        SELECT items.id,
               items.name,
               categories.category_name,
               item_types.type_name,
               items.image_url,
               ROUND(items.price)                             as price,
               items.description,
               (SELECT JSON_ARRAYAGG(tasting_notes.note_name)
                FROM items_tasting_notes
                         INNER JOIN tasting_notes ON tasting_notes.id = items_tasting_notes.tasting_note_id
                WHERE items_tasting_notes.item_id = items.id) as tasting_notes,
               item_sizes.teabag_size
        FROM items
                 INNER JOIN items_tasting_notes ON items.id = items_tasting_notes.item_id
                 INNER JOIN tasting_notes ON tasting_notes.id = items_tasting_notes.tasting_note_id
                 INNER JOIN item_sizes ON items.size_id = item_sizes.id
                 INNER JOIN item_types ON items.item_type_id = item_types.id
                 INNER JOIN categories ON items.category_id = categories.id
            ${filterQuery}
    `);
    const categoryData = await appDataSource.query(`
        SELECT category_description.category_title,
               category_description.category_description
        FROM category_description
                 INNER JOIN item_types ON category_description.item_type_id = item_types.id
                 INNER JOIN categories ON categories.id = category_description.categories_id
        WHERE item_type_id = ${TYPE_ID[itemType]}
          AND categories_id = ${CATEGORY_ID[category]}`);

    return [itemData, categoryData];
}


const getTeacups = async (limit, offset, sorting, tasting_notes, price, category, itemType) => {
    console.log(category, itemType)

    const filterQuery = new ItemQueryBuilder(
        limit, offset, sorting, tasting_notes, price, category, itemType
    ).build();
    console.log(category, itemType)

    const itemData = await appDataSource.query(`
        SELECT items.id,
               items.name,
               item_types.type_name,
               categories.category_name,
               items.image_url,
               ROUND(items.price) as price,
               items.description
        FROM items
                 INNER JOIN item_types ON items.item_type_id = item_types.id
                 INNER JOIN categories ON items.category_id = categories.id
            ${filterQuery}
    `);

    const categoryData = await appDataSource.query(`
        SELECT category_description.category_title,
               category_description.category_description
        FROM category_description
                 INNER JOIN item_types ON category_description.item_type_id = item_types.id
                 INNER JOIN categories ON categories.id = category_description.categories_id
        WHERE item_type_id = ${TYPE_ID[itemType]}
          AND categories_id = ${CATEGORY_ID[category]}`);

    return [itemData, categoryData];
};


const getDetailItem = async (itemId) => {
    return appDataSource.query(
        `SELECT i.id,
                i.name,
                categories.category_name         AS category_name,
                i.description                    AS description,
                item_types.type_name             AS type_name,
                i.image_url,
                ROUND(i.price)                   AS price,
                item_sizes.teabag_size           AS teabag_size,
                JSON_ARRAYAGG(
                        tasting_notes.note_name) AS tasting_notes
         FROM items AS i
                  INNER JOIN item_types ON i.item_type_id = item_types.id
                  INNER JOIN categories ON i.category_id = categories.id
                  LEFT JOIN item_sizes ON i.size_id = item_sizes.id
                  LEFT JOIN items_tasting_notes ON i.id = items_tasting_notes.item_id
                  LEFT JOIN tasting_notes ON items_tasting_notes.tasting_note_id = tasting_notes.id
         WHERE i.id = ?`,
        [itemId]
    );
};

module.exports = {
    getTeabags, getTeacups, getDetailItem
}
