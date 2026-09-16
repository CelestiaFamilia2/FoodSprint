/*
============================================
MAIN APPLICATION
============================================
*/


/* ==========================================
   DOM ELEMENTS
========================================== */

const menuContainer =
    document.getElementById(
        "menuContainer"
    );


const cartButton =
    document.getElementById(
        "cartButton"
    );


const cartCount =
    document.getElementById(
        "cartCount"
    );


const cartSidebar =
    document.getElementById(
        "cartSidebar"
    );


const cartOverlay =
    document.getElementById(
        "cartOverlay"
    );


const closeCart =
    document.getElementById(
        "closeCart"
    );


const cartItemsContainer =
    document.getElementById(
        "cartItems"
    );


const subtotalElement =
    document.getElementById(
        "subtotal"
    );


const deliveryFeeElement =
    document.getElementById(
        "deliveryFee"
    );


const totalPriceElement =
    document.getElementById(
        "totalPrice"
    );


const checkoutButton =
    document.getElementById(
        "checkoutButton"
    );


const clearCartButton =
    document.getElementById(
        "clearCartButton"
    );


const orderModal =
    document.getElementById(
        "orderModal"
    );


const closeModal =
    document.getElementById(
        "closeModal"
    );


const orderMessage =
    document.getElementById(
        "orderMessage"
    );


const finalOrderSummary =
    document.getElementById(
        "finalOrderSummary"
    );


const categoryButtons =
    document.querySelectorAll(
        ".category-btn"
    );


/* ==========================================
   SETTINGS
========================================== */

const DELIVERY_FEE = 40;


/* ==========================================
   DISPLAY MENU
========================================== */

function displayMenu(
    category = "all"
) {

    menuContainer.innerHTML = "";


    let filteredItems =
        menuItems;


    if (category !== "all") {

        filteredItems =
            menuItems.filter(

                item =>
                    item.category ===
                    category

            );

    }


    filteredItems.forEach(
        item => {

            const card =
                document.createElement(
                    "div"
                );


            card.classList.add(
                "menu-card"
            );


            card.innerHTML = `

                <div class="item-image">

                    ${item.emoji}

                </div>


                <div class="card-content">

                    <span class="category-label">

                        ${item.type}

                    </span>


                    <h3>
                        ${item.name}
                    </h3>


                    <p class="ingredients">

                        <strong>
                            Ingredients:
                        </strong>

                        ${item.ingredients.join(", ")}

                    </p>


                    <div class="item-footer">

                        <span class="item-price">

                            ₱${item.price.toFixed(2)}

                        </span>


                        <button
                            class="add-btn"
                            onclick="addToCart(${item.id})">

                            + Add

                        </button>

                    </div>

                </div>

            `;


            menuContainer.appendChild(
                card
            );

        }
    );

}

/* ==========================================
   CATEGORY FILTER
========================================== */

categoryButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                // Remove active class from all buttons
                categoryButtons.forEach(
                    btn =>
                        btn.classList.remove(
                            "active"
                        )
                );

                // Add active class to clicked button
                button.classList.add(
                    "active"
                );

                // Get selected category
                const category =
                    button.dataset.category;

                // Display selected category items
                displayMenu(
                    category
                );


                /* =====================================
                   SMOOTH SCROLL TO MENU ITEMS
                ===================================== */

                setTimeout(
                    () => {

                        menuContainer.scrollIntoView({

                            behavior: "smooth",

                            block: "start"

                        });

                    },
                    100
                );

            }
        );

    }
);

/* ==========================================
   ADD TO CART
========================================== */

function addToCart(id) {

    const item =
        menuItems.find(
            item => item.id === id
        );


    if (!item) {

        return;

    }


    /*
    Singleton cart object
    */

    cart.addItem(
        item
    );


    updateCart();


    showTemporaryButtonMessage(
        id
    );

}


/* ==========================================
   BUTTON FEEDBACK
========================================== */

function showTemporaryButtonMessage(id) {

    const buttons =
        document.querySelectorAll(
            ".add-btn"
        );


    buttons.forEach(
        button => {

            if (
                button.getAttribute(
                    "onclick"
                ) ===
                `addToCart(${id})`
            ) {

                const oldText =
                    button.innerHTML;


                button.innerHTML =
                    "✓ Added";


                setTimeout(
                    () => {

                        button.innerHTML =
                            oldText;

                    },
                    700
                );

            }

        }
    );

}


/* ==========================================
   UPDATE CART
========================================== */

function updateCart() {

    displayCartItems();

    updateCartTotals();

    updateCartCount();

}


/* ==========================================
   CART COUNT
========================================== */

function updateCartCount() {

    cartCount.textContent =
        cart.getTotalQuantity();

}


/* ==========================================
   DISPLAY CART
========================================== */

function displayCartItems() {

    const items =
        cart.getItems();


    cartItemsContainer.innerHTML =
        "";


    if (items.length === 0) {

        cartItemsContainer.innerHTML = `

            <div class="empty-cart">

                <div>
                    🛒
                </div>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add delicious food to get started.
                </p>

            </div>

        `;


        return;

    }


    items.forEach(
        item => {

            const cartItem =
                document.createElement(
                    "div"
                );


            cartItem.classList.add(
                "cart-item"
            );


            cartItem.innerHTML = `

                <div class="cart-item-emoji">

                    ${item.emoji}

                </div>


                <div class="cart-item-info">

                    <h4>
                        ${item.name}
                    </h4>


                    <span class="cart-item-price">

                        ₱${item.price.toFixed(2)}

                    </span>


                    <div class="quantity">

                        <button
                            onclick="decreaseQuantity(${item.id})">

                            −

                        </button>


                        <span>

                            ${item.quantity}

                        </span>


                        <button
                            onclick="increaseQuantity(${item.id})">

                            +

                        </button>

                    </div>

                </div>


                <button
                    class="remove-item"
                    onclick="removeItem(${item.id})">

                    🗑️

                </button>

            `;


            cartItemsContainer.appendChild(
                cartItem
            );

        }
    );

}


/* ==========================================
   INCREASE QUANTITY
========================================== */

function increaseQuantity(id) {

    cart.increaseQuantity(
        id
    );


    updateCart();

}


/* ==========================================
   DECREASE QUANTITY
========================================== */

function decreaseQuantity(id) {

    cart.decreaseQuantity(
        id
    );


    updateCart();

}


/* ==========================================
   REMOVE ITEM
========================================== */

function removeItem(id) {

    cart.removeItem(
        id
    );


    updateCart();

}


/* ==========================================
   CALCULATE TOTAL
========================================== */

function updateCartTotals() {

    const subtotal =
        cart.getSubtotal();


    /*
    Delivery fee is only added
    when the cart has items.
    */

    const delivery =
        subtotal > 0
            ? DELIVERY_FEE
            : 0;


    const total =
        subtotal +
        delivery;


    subtotalElement.textContent =
        `₱${subtotal.toFixed(2)}`;


    deliveryFeeElement.textContent =
        `₱${delivery.toFixed(2)}`;


    totalPriceElement.textContent =
        `₱${total.toFixed(2)}`;

}


/* ==========================================
   OPEN CART
========================================== */

function openCartSidebar() {

    cartSidebar.classList.add(
        "active"
    );


    cartOverlay.classList.add(
        "active"
    );

}


/* ==========================================
   CLOSE CART
========================================== */

function closeCartSidebar() {

    cartSidebar.classList.remove(
        "active"
    );


    cartOverlay.classList.remove(
        "active"
    );

}


/* ==========================================
   CART EVENTS
========================================== */

cartButton.addEventListener(
    "click",
    openCartSidebar
);


closeCart.addEventListener(
    "click",
    closeCartSidebar
);


cartOverlay.addEventListener(
    "click",
    closeCartSidebar
);


/* ==========================================
   CLEAR CART
========================================== */

clearCartButton.addEventListener(
    "click",
    () => {

        if (
            cart.getItems().length === 0
        ) {

            alert(
                "Your cart is already empty."
            );

            return;

        }


        const confirmation =
            confirm(
                "Are you sure you want to clear your cart?"
            );


        if (confirmation) {

            cart.clearCart();

            updateCart();

        }

    }
);


/* ==========================================
   GET PAYMENT STRATEGY
========================================== */

function getSelectedPaymentStrategy() {

    const selectedPayment =
        document.querySelector(

            'input[name="payment"]:checked'

        ).value;


    switch (
        selectedPayment
    ) {

        case "cash":

            return new CashPaymentStrategy();


        case "gcash":

            return new GCashPaymentStrategy();


        case "maya":

            return new MayaPaymentStrategy();


        case "paypal":

            return new PayPalPaymentStrategy();


        default:

            return new CashPaymentStrategy();

    }

}


/* ==========================================
   CHECKOUT WITH MODAL FORM & VALIDATION
========================================== */

const paymentInputModal = document.getElementById("paymentInputModal");
const paymentModalTitle = document.getElementById("paymentModalTitle");
const paymentModalInstruction = document.getElementById("paymentModalInstruction");
const paymentInputLabel = document.getElementById("paymentInputLabel");
const paymentInputVal = document.getElementById("paymentInputVal");
const confirmPaymentBtn = document.getElementById("confirmPaymentBtn");
const cancelPaymentBtn = document.getElementById("cancelPaymentBtn");

let pendingTotal = 0;
let pendingItems = [];
let pendingStrategy = null;
let currentSelectedPaymentType = "";

checkoutButton.addEventListener(
    "click",
    () => {
        const items = cart.getItems();

        if (items.length === 0) {
            alert("Please add items to your cart first.");
            return;
        }

        const subtotal = cart.getSubtotal();
        pendingTotal = subtotal + DELIVERY_FEE;
        pendingItems = items;
        pendingStrategy = getSelectedPaymentStrategy();

        currentSelectedPaymentType = document.querySelector('input[name="payment"]:checked').value;

        // If GCash, Maya, or PayPal, open modal to collect account details. Cash passes through immediately.
        if (currentSelectedPaymentType === "gcash" || currentSelectedPaymentType === "maya" || currentSelectedPaymentType === "paypal") {
            if (paymentInputModal) {
                paymentInputModal.classList.add("active");
                paymentInputVal.value = ""; // clear old inputs

                if (currentSelectedPaymentType === "gcash") {
                    paymentModalTitle.textContent = "📱 GCash Checkout";
                    paymentModalInstruction.textContent = `Total amount due: ₱${pendingTotal.toFixed(2)}`;
                    paymentInputLabel.textContent = "Enter GCash Mobile Number (11 digits):";
                    paymentInputVal.placeholder = "e.g., 09123456789";
                    paymentInputVal.type = "tel";
                } else if (currentSelectedPaymentType === "maya") {
                    paymentModalTitle.textContent = "🟢 Maya Checkout";
                    paymentModalInstruction.textContent = `Total amount due: ₱${pendingTotal.toFixed(2)}`;
                    paymentInputLabel.textContent = "Enter Maya Mobile Number (11 digits):";
                    paymentInputVal.placeholder = "e.g., 09123456789";
                    paymentInputVal.type = "tel";
                } else {
                    paymentModalTitle.textContent = "🅿️ PayPal Checkout";
                    paymentModalInstruction.textContent = `Total amount due: ₱${pendingTotal.toFixed(2)}`;
                    paymentInputLabel.textContent = "Enter PayPal Email Address:";
                    paymentInputVal.placeholder = "e.g., name@example.com";
                    paymentInputVal.type = "email";
                }
            } else {
                finalizeOrder("");
            }
        } else {
            finalizeOrder("");
        }
    }
);

// Confirm button inside payment modal with 11-digit and non-numeric word check
if (confirmPaymentBtn) {
    confirmPaymentBtn.onclick = () => {
        const detailValue = paymentInputVal.value.trim();

        if (!detailValue) {
            alert("Please fill in the required payment information.");
            return;
        }

        // Validation rule for GCash and Maya: must be exactly 11 digits and contain no letters or symbols
        if (currentSelectedPaymentType === "gcash" || currentSelectedPaymentType === "maya") {
            const isNumeric = /^\d+$/.test(detailValue);
            if (!isNumeric || detailValue.length !== 11) {
                const walletName = currentSelectedPaymentType === "gcash" ? "GCash" : "Maya";
                alert(`Invalid ${walletName} number! Please enter exactly 11 numeric digits (e.g., 09123456789). Words or incomplete numbers are not allowed.`);
                return;
            }
        }

        // Validation rule for PayPal: must look like a valid email address
        if (currentSelectedPaymentType === "paypal") {
            const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(detailValue);
            if (!isValidEmail) {
                alert("Invalid PayPal email! Please enter a valid email address (e.g., name@example.com).");
                return;
            }
        }

        paymentInputModal.classList.remove("active");
        finalizeOrder(detailValue);
    };
}

// Cancel button inside payment modal
if (cancelPaymentBtn) {
    cancelPaymentBtn.onclick = () => {
        paymentInputModal.classList.remove("active");
    };
}

// Helper function to complete order execution
function finalizeOrder(extraDetail) {
    const paymentContext = new PaymentContext();
    paymentContext.setStrategy(pendingStrategy);

    const paymentResult = paymentContext.executePayment(pendingTotal);

    // Append user input details to message if provided
    if (extraDetail) {
        paymentResult.message += ` Account/Ref: ${extraDetail}`;
    }

    const subtotal = cart.getSubtotal();

    generateOrderSummary(
        pendingItems,
        subtotal,
        DELIVERY_FEE,
        pendingTotal,
        paymentResult
    );

    saveLastOrder(
        pendingItems,
        pendingTotal,
        paymentResult.method
    );

    cart.clearCart();
    updateCart();
    closeCartSidebar();

    orderModal.classList.add("active");
}


/* ==========================================
   ORDER SUMMARY
========================================== */

function generateOrderSummary(

    items,

    subtotal,

    delivery,

    total,

    payment

) {

    finalOrderSummary.innerHTML =
        "";


    items.forEach(
        item => {

            const summaryItem =
                document.createElement(
                    "div"
                );


            summaryItem.classList.add(
                "summary-item"
            );


            summaryItem.innerHTML = `

                <span>

                    ${item.quantity}x
                    ${item.name}

                </span>

                <strong>

                    ₱${(
                        item.price *
                        item.quantity
                    ).toFixed(2)}

                </strong>

            `;


            finalOrderSummary.appendChild(
                summaryItem
            );

        }
    );


    finalOrderSummary.innerHTML += `

        <div class="summary-item">

            <span>
                Subtotal
            </span>

            <span>
                ₱${subtotal.toFixed(2)}
            </span>

        </div>


        <div class="summary-item">

            <span>
                Delivery
            </span>

            <span>
                ₱${delivery.toFixed(2)}
            </span>

        </div>


        <div class="summary-item">

            <span>
                ${payment.icon}
                Payment
            </span>

            <span>
                ${payment.method}
            </span>

        </div>


        <div class="summary-total">

            <span>
                Total
            </span>

            <span>
                ₱${total.toFixed(2)}
            </span>

        </div>

    `;


    orderMessage.textContent =
        payment.message;

}


/* ==========================================
   SAVE LAST ORDER
   LOCAL STORAGE
========================================== */

function saveLastOrder(

    items,

    total,

    paymentMethod

) {

    const order = {

        orderNumber:
            "ORD-" +
            Date.now(),

        items:
            JSON.parse(
                JSON.stringify(
                    items
                )
            ),

        total:
            total,

        paymentMethod:
            paymentMethod,

        date:
            new Date()
                .toLocaleString()

    };


    localStorage.setItem(

        "lastRestaurantOrder",

        JSON.stringify(
            order
        )

    );

}


/* ==========================================
   CLOSE MODAL
========================================== */

closeModal.addEventListener(
    "click",
    () => {

        orderModal.classList.remove(
            "active"
        );

    }
);


orderModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            orderModal
        ) {

            orderModal.classList.remove(
                "active"
            );

        }

    }
);


/* ==========================================
   INITIALIZE APPLICATION
========================================== */

displayMenu();

updateCart();