const appDataSource = require("./dataSource");

const ORDERBY = Object.freeze({
    'price': 'ORDER BY price ASC',
    '-price': 'ORDER BY price DESC',
    'name': 'ORDER BY name ASC',
    'id': 'ORDER BY id ASC'
})

const TYPE_NAME = Object.freeze({
    'teabags': '티백',
    'teacups': '찻잔'
})

const CATEGORY_NAME = Object.freeze({
    'floral': 'Floral',
    'herbal': 'Herbal',
    'citrus': 'Citrus'
})

const getTeabags = async (order = 'id', tasting_notes = null, price = null, category) => {
    const orderClause = ORDERBY[order]
    const itemTypeName = TYPE_NAME['teabags']
    const categoryName = CATEGORY_NAME[category]
    let tastingNotesClause = ""
    if (tasting_notes) tastingNotesClause = `AND tasting_notes.note_name IN (${tasting_notes})`
    let priceClause = ""
    if (price) {
        switch (price) {
            case "30000" :
                priceClause = `AND price < ${price}`
                break;
            case "30000~40000" :
                const priceRange1 = price.substring(0, 5)
                const priceRange2 = price.substring(6, 11)
                priceClause = `AND price >= ${priceRange1} AND price < ${priceRange2}`
                break;
            case "40000~50000" :
                const priceRange3 = price.substring(0, 5)
                const priceRange4 = price.substring(6, 11)
                priceClause = `AND price >= ${priceRange3} AND price < ${priceRange4}`
                break;
            case "50000" :
                priceClause = `AND price > ${price}`
                break;
        }
    }

    const itemData = await appDataSource.query(`
                SELECT items.id,
                       items.name,
                       categories.category_name,
                       item_types.type_name,
                       items.image_url,
                       items.price,
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
                WHERE item_types.type_name = "${itemTypeName}"
                  AND categories.category_name = "${categoryName}"
                    ${tastingNotesClause} ${priceClause}
                GROUP BY id ${orderClause}
        `
    );

    const categoryData = await appDataSource.query(`
        SELECT category_description.category_title,
               category_description.category_description
        FROM category_description
        INNER JOIN item_types ON category_description.item_type_id = item_types.id
        INNER JOIN categories ON categories.id = category_description.categories_id
        WHERE item_types.type_name = "${itemTypeName}"
          AND categories.category_name = "${categoryName}"`)

    return [itemData, categoryData];
};


const getTeacups = async (order = 'id', price = null, category) => {
    const orderClause = ORDERBY[order]
    const itemTypeName = TYPE_NAME['teacups']
    const categoryName = CATEGORY_NAME[category]
    let priceClause = ""
    console.log(order, price)
    if (price) {
        switch (price) {
            case "30000" :
                priceClause = `AND price < ${price}`
                break;
            case "30000~40000" :
                const priceRange1 = price.substring(0, 5)
                const priceRange2 = price.substring(6, 11)
                priceClause = `AND price >= ${priceRange1} AND price < ${priceRange2}`
                break;
            case "40000~50000" :
                const priceRange3 = price.substring(0, 5)
                const priceRange4 = price.substring(6, 11)
                priceClause = `AND price >= ${priceRange3} AND price < ${priceRange4}`
                break;
            case "50000" :
                priceClause = `AND price > ${price}`
                break;
        }
    }

    const itemData = await appDataSource.query(`
                SELECT items.id,
                       items.name,
                       item_types.type_name,
                       categories.category_name,
                       items.image_url,
                       items.price,
                       items.description
                FROM items
                         INNER JOIN item_types ON items.item_type_id = item_types.id
                         INNER JOIN categories ON items.category_id = categories.id
                WHERE item_types.type_name = "${itemTypeName}"
                  AND categories.category_name = "${categoryName}"
                    ${priceClause}
                GROUP BY id ${orderClause}
        `
    );


    const categoryData = await appDataSource.query(`
        SELECT category_description.category_title,
               category_description.category_description
        FROM category_description
                 INNER JOIN item_types ON category_description.item_type_id = item_types.id
                 INNER JOIN categories ON categories.id = category_description.categories_id
        WHERE item_types.type_name = "${itemTypeName}"
          AND categories.category_name = "${categoryName}"`)

    return [itemData, categoryData];
};

module.exports = {
    getTeabags, getTeacups
};
