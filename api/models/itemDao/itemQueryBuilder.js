class ItemQueryBuilder {
    constructor(limit, offset, sorting = '', tasting_notes = '', price = '', category, itemType) {
        this.limit = limit;
        this.offset = offset;
        this.sorting = sorting;
        this.tasting_notes = tasting_notes;
        this.price = price;
        this.category = category;
        this.itemType= itemType;
    }

    tastingNotesBuilder() {
        if(this.tasting_notes){
            return `AND tasting_notes.note_name IN (${this.tasting_notes})`
        }
    }

    categoryIdBuilder() {
        const CATEGORY_ID = Object.freeze({
            floral: 1,
            herbal: 2,
            citrus: 3,
        });
        return `AND category_id = ${CATEGORY_ID[this.category]}`
    }

    typeIdBuilder(){
        const TYPE_ID = Object.freeze({
            teabags: 1,
            teacups: 2,
        });
        return `WHERE item_type_id = ${TYPE_ID[this.itemType]}`
    }

    priceBuilder() {
        if(this.price){
            switch (this.price) {
                case "30000":
                    return `AND price < ${this.price}`;
                case "30000~40000":
                    return `AND price >= ${this.price.substring(0, 5)} AND price < ${this.price.substring(6, 11)}`;
                case "40000~50000":
                    return `AND price >= ${this.price.substring(0, 5)} AND price < ${this.price.substring(6, 11)}`;
                case "50000":
                    return `AND price > ${this.price}`;
            }
        }
    }

    groupByBuilder(){
        return `GROUP BY id`
    }

    orderByBuilder() {
        const ORDERBY = Object.freeze({
            price: "ORDER BY price ASC",
            "-price": "ORDER BY price DESC",
            name: "ORDER BY name ASC",
            id: "ORDER BY id ASC",
        });
        return ORDERBY[this.sorting]
    }

    limitBuilder() {
        return `LIMIT ${this.limit}`;
    }

    offsetBuilder() {
        return `OFFSET ${this.offset}`
    }

    build() {
        const filterQuery = [
            this.typeIdBuilder(),
            this.categoryIdBuilder(),
            this.tastingNotesBuilder(),
            this.priceBuilder(),
            this.groupByBuilder(),
            this.orderByBuilder(),
            this.limitBuilder(),
            this.offsetBuilder(),
        ]
        return filterQuery.join(' ')
    }
}

module.exports = {ItemQueryBuilder};

