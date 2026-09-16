/*
============================================
FACTORY DESIGN PATTERN
============================================

The Factory Pattern is responsible for
creating different types of restaurant items.

Categories:
1. Food
2. Drink
3. Dessert
*/


class MenuItem {

    constructor(
        id,
        name,
        price,
        ingredients,
        category,
        emoji
    ) {

        this.id = id;
        this.name = name;
        this.price = price;
        this.ingredients = ingredients;
        this.category = category;
        this.emoji = emoji;

    }

}


/* ================= FOOD ================= */

class Food extends MenuItem {

    constructor(
        id,
        name,
        price,
        ingredients,
        emoji
    ) {

        super(
            id,
            name,
            price,
            ingredients,
            "food",
            emoji
        );

        this.type = "Food";

    }

}


/* ================= DRINK ================= */

class Drink extends MenuItem {

    constructor(
        id,
        name,
        price,
        ingredients,
        emoji
    ) {

        super(
            id,
            name,
            price,
            ingredients,
            "drink",
            emoji
        );

        this.type = "Drink";

    }

}


/* ================= DESSERT ================= */

class Dessert extends MenuItem {

    constructor(
        id,
        name,
        price,
        ingredients,
        emoji
    ) {

        super(
            id,
            name,
            price,
            ingredients,
            "dessert",
            emoji
        );

        this.type = "Dessert";

    }

}


/* ==========================================
   RESTAURANT FACTORY
========================================== */

class RestaurantFactory {

    static createItem(
        category,
        id,
        name,
        price,
        ingredients,
        emoji
    ) {

        switch (category.toLowerCase()) {

            case "food":

                return new Food(
                    id,
                    name,
                    price,
                    ingredients,
                    emoji
                );


            case "drink":

                return new Drink(
                    id,
                    name,
                    price,
                    ingredients,
                    emoji
                );


            case "dessert":

                return new Dessert(
                    id,
                    name,
                    price,
                    ingredients,
                    emoji
                );


            default:

                throw new Error(
                    `Unknown category: ${category}`
                );

        }

    }

}