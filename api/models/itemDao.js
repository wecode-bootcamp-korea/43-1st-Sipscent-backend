const appDataSource = require("./dataSource");

const seeFloralTeabags = async (data) => {

    let orderClause = ""
    let whereClause = ""
    if (data.hasOwnProperty("order") && data["order"].startsWith("-")) {
        orderClause = `ORDER BY ${data["order"].substring(1)} DESC`
    } else if (data.hasOwnProperty("order")) {
        orderClause = `ORDER BY ${data["order"]} ASC`
    } else if (data.hasOwnProperty("tasting_notes")) {
        whereClause = `AND tasting_notes.note_name IN (${data["tasting_notes"]})`
    } else if (data.hasOwnProperty("price") && Array.isArray(data["price"]) === true) {
        whereClause = `AND price > ${data["price"][0]} AND price < ${data["price"][1]}`
    } else if (data.hasOwnProperty("price") && Array.isArray(data["price"]) === false && data["price"] === "30000") {
        whereClause = `AND price <= ${data["price"]}`
    } else if (data.hasOwnProperty("price") && Array.isArray(data["price"]) === false && data["price"] === "50000") {
        whereClause = `AND price >${data["price"]}`
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
                WHERE item_type_id = 1
                  AND category_id = 1
                    ${whereClause}
                GROUP BY id ${orderClause}
        `
    );
    const categoryData = await appDataSource.query(`
        SELECT category_title,
               category_description
        FROM category_description
        WHERE item_type_id = 1
          AND categories_id = 1`)
    return [itemData, categoryData];


};

const seeHerbalTeabags = async (data) => {

    let orderClause = ""
    let whereClause = ""
    if (data.hasOwnProperty("order") && data["order"].startsWith("-")) {
        orderClause = `ORDER BY ${data["order"].substring(1)} DESC`
    } else if (data.hasOwnProperty("order")) {
        orderClause = `ORDER BY ${data["order"]} ASC`
    } else if (data.hasOwnProperty("tasting_notes")) {
        whereClause = `AND tasting_notes.note_name IN (${data["tasting_notes"]})`
    } else if (data.hasOwnProperty("price") && Array.isArray(data["price"]) === true) {
        whereClause = `AND price > ${data["price"][0]} AND price < ${data["price"][1]}`
    } else if (data.hasOwnProperty("price") && Array.isArray(data["price"]) === false && data["price"] === "30000") {
        whereClause = `AND price <= ${data["price"]}`
    } else if (data.hasOwnProperty("price") && Array.isArray(data["price"]) === false && data["price"] === "50000") {
        whereClause = `AND price >${data["price"]}`
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
        WHERE item_type_id = 1
          AND category_id = 2
            ${whereClause}
        GROUP BY id ${orderClause}
    `);
    const categoryData = await appDataSource.query(`
        SELECT category_title,
               category_description
        FROM category_description
        WHERE item_type_id = 1
          AND categories_id = 2`)
    return [itemData, categoryData];

};

const seeCitrusTeabags = async (data) => {

    let orderClause = ""
    let whereClause = ""
    if (data.hasOwnProperty("order") && data["order"].startsWith("-")) {
        orderClause = `ORDER BY ${data["order"].substring(1)} DESC`
    } else if (data.hasOwnProperty("order")) {
        orderClause = `ORDER BY ${data["order"]} ASC`
    } else if (data.hasOwnProperty("tasting_notes")) {
        whereClause = `AND tasting_notes.note_name IN (${data["tasting_notes"]})`
    } else if (data.hasOwnProperty("price") && Array.isArray(data["price"]) === true) {
        whereClause = `AND price > ${data["price"][0]} AND price < ${data["price"][1]}`
    } else if (data.hasOwnProperty("price") && Array.isArray(data["price"]) === false && data["price"] === "30000") {
        whereClause = `AND price <= ${data["price"]}`
    } else if (data.hasOwnProperty("price") && Array.isArray(data["price"]) === false && data["price"] === "50000") {
        whereClause = `AND price >${data["price"]}`
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
        WHERE item_type_id = 1
          AND category_id = 3
            ${whereClause}
        GROUP BY id ${orderClause}
    `);
    const categoryData = await appDataSource.query(`
        SELECT category_title,
               category_description
        FROM category_description
        WHERE item_type_id = 1
          AND categories_id = 3`)
    return [itemData, categoryData];

};


const seeFloralTeacups = async (data) => {

    let orderClause = ""
    let whereClause = ""
    if (data.hasOwnProperty("order") && data["order"].startsWith("-")) {
        orderClause = `ORDER BY ${data["order"].substring(1)} DESC`
    } else if (data.hasOwnProperty("order")) {
        orderClause = `ORDER BY ${data["order"]} ASC`
    } else if (data.hasOwnProperty("price") && Array.isArray(data["price"]) === true) {
        whereClause = `AND price > ${data["price"][0]} AND price < ${data["price"][1]}`
    } else if (data.hasOwnProperty("price") && Array.isArray(data["price"]) === false && data["price"] === "30000") {
        whereClause = `AND price <= ${data["price"]}`
    } else if (data.hasOwnProperty("price") && Array.isArray(data["price"]) === false && data["price"] === "50000") {
        whereClause = `AND price >${data["price"]}`
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
                 INNER JOIN item_types ON item_types.id = items.item_type_id
                 INNER JOIN categories ON categories.id = items.category_id
        WHERE item_type_id = 2
          AND category_id = 1
            ${whereClause}
        GROUP BY id ${orderClause}`
    );
    const categoryData = await appDataSource.query(`
        SELECT category_title,
               category_description
        FROM category_description
        WHERE item_type_id = 2
          AND categories_id = 1`)
    return [itemData, categoryData];

};


const seeHerbalTeacups = async (data) => {

    let orderClause = ""
    let whereClause = ""
    if (data.hasOwnProperty("order") && data["order"].startsWith("-")) {
        orderClause = `ORDER BY ${data["order"].substring(1)} DESC`
    } else if (data.hasOwnProperty("order")) {
        orderClause = `ORDER BY ${data["order"]} ASC`
    } else if (data.hasOwnProperty("price") && Array.isArray(data["price"]) === true) {
        whereClause = `AND price > ${data["price"][0]} AND price < ${data["price"][1]}`
    } else if (data.hasOwnProperty("price") && Array.isArray(data["price"]) === false && data["price"] === "30000") {
        whereClause = `AND price <= ${data["price"]}`
    } else if (data.hasOwnProperty("price") && Array.isArray(data["price"]) === false && data["price"] === "50000") {
        whereClause = `AND price >${data["price"]}`
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
                 INNER JOIN item_types ON item_types.id = items.item_type_id
                 INNER JOIN categories ON categories.id = items.category_id
        WHERE item_type_id = 2
          AND category_id = 2
            ${whereClause}
        GROUP BY id ${orderClause}`);
    const categoryData = await appDataSource.query(`
        SELECT category_title,
               category_description
        FROM category_description
        WHERE item_type_id = 2
          AND categories_id = 2`)
    return [itemData, categoryData];

};

const seeCitrusTeacups = async (data) => {

    let orderClause = ""
    let whereClause = ""
    if (data.hasOwnProperty("order") && data["order"].startsWith("-")) {
        orderClause = `ORDER BY ${data["order"].substring(1)} DESC`
    } else if (data.hasOwnProperty("order")) {
        orderClause = `ORDER BY ${data["order"]} ASC`
    } else if (data.hasOwnProperty("price") && Array.isArray(data["price"]) === true) {
        whereClause = `AND price > ${data["price"][0]} AND price < ${data["price"][1]}`
    } else if (data.hasOwnProperty("price") && Array.isArray(data["price"]) === false && data["price"] === "30000") {
        whereClause = `AND price <= ${data["price"]}`
    } else if (data.hasOwnProperty("price") && Array.isArray(data["price"]) === false && data["price"] === "50000") {
        whereClause = `AND price >${data["price"]}`
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
                 INNER JOIN item_types ON item_types.id = items.item_type_id
                 INNER JOIN categories ON categories.id = items.category_id
        WHERE item_type_id = 2
          AND category_id = 3
            ${whereClause}
        GROUP BY id ${orderClause}`);
    const categoryData = await appDataSource.query(`
        SELECT category_title,
               category_description
        FROM category_description
        WHERE item_type_id = 2
          AND categories_id = 3`)
    return [itemData, categoryData];

};


module.exports = {
    seeFloralTeabags,
    seeHerbalTeabags,
    seeCitrusTeabags,
    seeFloralTeacups,
    seeHerbalTeacups,
    seeCitrusTeacups
}