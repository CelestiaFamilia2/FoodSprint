/*
============================================
MENU DATA
============================================

All menu items are created using
RestaurantFactory.createItem().

Each item's "image" path points to a file
inside the /images folder. Add a matching
image file for each item (same file name)
so it displays on the menu and in the cart.
If an image is missing or fails to load,
the emoji is shown instead as a fallback.
*/


const menuItems = [


    /* ==================================
       FOOD
    ================================== */

    RestaurantFactory.createItem(

        "food",

        1,

        "Spaghetti",

        120,

        [
            "Pasta",
            "Tomato Sauce",
            "Ground Beef",
            "Cheese"
        ],

        "images/spaghetti.jpg",

        "🍝"

    ),


    RestaurantFactory.createItem(

        "food",

        2,

        "Fried Chicken",

        150,

        [
            "Chicken",
            "Flour",
            "Seasoning",
            "Cooking Oil"
        ],

        "images/fried-chicken.jpg",

        "🍗"

    ),


    RestaurantFactory.createItem(

        "food",

        3,

        "Cheeseburger",

        130,

        [
            "Beef Patty",
            "Cheese",
            "Lettuce",
            "Tomato",
            "Burger Bun"
        ],

        "images/cheeseburger.jpg",

        "🍔"

    ),


    RestaurantFactory.createItem(

        "food",

        4,

        "Burrito",

        145,

        [
            "Tortilla",
            "Beef",
            "Rice",
            "Cheese",
            "Vegetables"
        ],

        "images/burrito.jpg",

        "🌯"

    ),


    RestaurantFactory.createItem(

        "food",

        5,

        "Pizza",

        220,

        [
            "Pizza Dough",
            "Tomato Sauce",
            "Mozzarella",
            "Pepperoni"
        ],

        "images/pizza.jpg",

        "🍕"

    ),


    RestaurantFactory.createItem(

        "food",

        6,

        "French Fries",

        90,

        [
            "Potatoes",
            "Salt",
            "Cooking Oil"
        ],

        "images/french-fries.jpg",

        "🍟"

    ),


    /* ==================================
       DRINKS
    ================================== */

    RestaurantFactory.createItem(

        "drink",

        7,

        "Water",

        25,

        [
            "Purified Water"
        ],

        "images/water.jpg",

        "💧"

    ),


    RestaurantFactory.createItem(

        "drink",

        8,

        "Sprite",

        45,

        [
            "Carbonated Water",
            "Lemon-Lime Flavor"
        ],

        "images/sprite.jpg",

        "🥤"

    ),


    RestaurantFactory.createItem(

        "drink",

        9,

        "Iced Tea",

        55,

        [
            "Tea",
            "Ice",
            "Sugar",
            "Lemon"
        ],

        "images/iced-tea.jpg",

        "🧋"

    ),


    RestaurantFactory.createItem(

        "drink",

        10,

        "Orange Juice",

        70,

        [
            "Fresh Orange",
            "Ice"
        ],

        "images/orange-juice.jpg",

        "🍊"

    ),


    RestaurantFactory.createItem(

        "drink",

        11,

        "Coffee",

        60,

        [
            "Coffee",
            "Water",
            "Sugar"
        ],

        "images/coffee.jpg",

        "☕"

    ),


    /* ==================================
       DESSERTS
    ================================== */

    RestaurantFactory.createItem(

        "dessert",

        12,

        "Ice Cream",

        75,

        [
            "Milk",
            "Cream",
            "Sugar",
            "Vanilla"
        ],

        "images/ice-cream.jpg",

        "🍨"

    ),


    RestaurantFactory.createItem(

        "dessert",

        13,

        "Chocolate Cake",

        95,

        [
            "Chocolate",
            "Flour",
            "Egg",
            "Milk",
            "Sugar"
        ],

        "images/chocolate-cake.jpg",

        "🍰"

    ),


    RestaurantFactory.createItem(

        "dessert",

        14,

        "Donut",

        55,

        [
            "Flour",
            "Sugar",
            "Milk",
            "Chocolate"
        ],

        "images/donut.jpg",

        "🍩"

    ),


    RestaurantFactory.createItem(

        "dessert",

        15,

        "Cupcake",

        65,

        [
            "Flour",
            "Butter",
            "Sugar",
            "Cream"
        ],

        "images/cupcake.jpg",

        "🧁"

    ),


    RestaurantFactory.createItem(

        "dessert",

        16,

        "Cookies",

        50,

        [
            "Flour",
            "Butter",
            "Chocolate Chips"
        ],

        "images/cookies.jpg",

        "🍪"

    )

];