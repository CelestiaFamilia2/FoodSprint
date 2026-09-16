/*
============================================
SINGLETON DESIGN PATTERN
============================================

The CartManager ensures that only ONE
shopping cart instance exists throughout
the application.

It also uses LocalStorage to save data.
*/


class CartManager {

    static instance = null;


    constructor() {

        /*
        If an instance already exists,
        return the existing instance.
        */

        if (CartManager.instance) {

            return CartManager.instance;

        }


        /* Load saved cart */

        const savedCart =
            localStorage.getItem("restaurantCart");


        if (savedCart) {

            try {

                this.items =
                    JSON.parse(savedCart);

            } catch (error) {

                this.items = [];

            }

        } else {

            this.items = [];

        }


        CartManager.instance = this;

    }


    /* ================= ADD ITEM ================= */

    addItem(item) {

        const existingItem =
            this.items.find(
                cartItem =>
                    cartItem.id === item.id
            );


        if (existingItem) {

            existingItem.quantity += 1;

        } else {

            this.items.push({

                id: item.id,

                name: item.name,

                price: item.price,

                ingredients:
                    item.ingredients,

                category:
                    item.category,

                type:
                    item.type,

                emoji:
                    item.emoji,

                quantity: 1

            });

        }


        this.save();

    }


    /* ================= REMOVE ITEM ================= */

    removeItem(id) {

        this.items =
            this.items.filter(
                item => item.id !== id
            );

        this.save();

    }


    /* ================= INCREASE ================= */

    increaseQuantity(id) {

        const item =
            this.items.find(
                item => item.id === id
            );


        if (item) {

            item.quantity++;

            this.save();

        }

    }


    /* ================= DECREASE ================= */

    decreaseQuantity(id) {

        const item =
            this.items.find(
                item => item.id === id
            );


        if (!item) {

            return;

        }


        if (item.quantity > 1) {

            item.quantity--;

        } else {

            this.removeItem(id);

        }


        this.save();

    }


    /* ================= TOTAL ================= */

    getSubtotal() {

        return this.items.reduce(

            (total, item) =>

                total +
                (
                    item.price *
                    item.quantity
                ),

            0

        );

    }


    /* ================= NUMBER OF ITEMS ================= */

    getTotalQuantity() {

        return this.items.reduce(

            (total, item) =>

                total +
                item.quantity,

            0

        );

    }


    /* ================= CLEAR ================= */

    clearCart() {

        this.items = [];

        this.save();

    }


    /* ================= GET ITEMS ================= */

    getItems() {

        return this.items;

    }


    /* ================= SAVE TO LOCAL STORAGE ================= */

    save() {

        localStorage.setItem(

            "restaurantCart",

            JSON.stringify(
                this.items
            )

        );

    }


    /* ================= GET SINGLETON ================= */

    static getInstance() {

        if (!CartManager.instance) {

            CartManager.instance =
                new CartManager();

        }

        return CartManager.instance;

    }

}


/*
Only one cart object is used
throughout the application.
*/

const cart =
    CartManager.getInstance();