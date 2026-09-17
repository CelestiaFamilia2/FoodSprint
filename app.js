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


const deliveryAddressInput =
    document.getElementById(
        "deliveryAddress"
    );


const deliveryAddressError =
    document.getElementById(
        "deliveryAddressError"
    );


const personalInfoButton =
    document.getElementById(
        "personalInfoButton"
    );


const personalInfoSummary =
    document.getElementById(
        "personalInfoSummary"
    );


const personalInfoError =
    document.getElementById(
        "personalInfoError"
    );


const personalInfoModal =
    document.getElementById(
        "personalInfoModal"
    );


const customerNameInput =
    document.getElementById(
        "customerNameInput"
    );


const customerNameError =
    document.getElementById(
        "customerNameError"
    );


const customerPhoneInput =
    document.getElementById(
        "customerPhoneInput"
    );


const customerPhoneError =
    document.getElementById(
        "customerPhoneError"
    );


const savePersonalInfoBtn =
    document.getElementById(
        "savePersonalInfoBtn"
    );


const cancelPersonalInfoBtn =
    document.getElementById(
        "cancelPersonalInfoBtn"
    );


/* ==========================================
   SETTINGS
========================================== */

const DELIVERY_FEE = 40;


/* ==========================================
   PERSONAL INFORMATION
   (Customer Name, Phone Number, Address)
========================================== */

// Prefill with the last personal info the customer used, if any
const savedCustomerInfoRaw =
    localStorage.getItem("customerInfo");

if (savedCustomerInfoRaw) {

    try {

        const savedCustomerInfo =
            JSON.parse(savedCustomerInfoRaw);

        customerNameInput.value =
            savedCustomerInfo.name || "";

        customerPhoneInput.value =
            savedCustomerInfo.phone || "";

        deliveryAddressInput.value =
            savedCustomerInfo.address || "";

    } catch (error) {

        // Ignore malformed saved data

    }

}

// Clear the error state on each field as soon as the user starts typing
customerNameInput.addEventListener("input", () => {

    if (customerNameInput.value.trim()) {

        customerNameInput.classList.remove("input-error");
        customerNameError.classList.remove("visible");

    }

});

customerPhoneInput.addEventListener("input", () => {

    if (customerPhoneInput.value.trim()) {

        customerPhoneInput.classList.remove("input-error");
        customerPhoneError.classList.remove("visible");

    }

});

deliveryAddressInput.addEventListener("input", () => {

    if (deliveryAddressInput.value.trim()) {

        deliveryAddressInput.classList.remove("input-error");
        deliveryAddressError.classList.remove("visible");

    }

});


function getCustomerName() {

    return customerNameInput.value.trim();

}

function getCustomerPhone() {

    return customerPhoneInput.value.trim();

}

function getDeliveryAddress() {

    return deliveryAddressInput.value.trim();

}


function validateCustomerName() {

    const name = getCustomerName();

    if (!name) {

        customerNameInput.classList.add("input-error");
        customerNameError.classList.add("visible");

        return false;

    }

    customerNameInput.classList.remove("input-error");
    customerNameError.classList.remove("visible");

    return true;

}

function validateCustomerPhone() {

    const phone = getCustomerPhone();

    // Accepts local (09XXXXXXXXX) or international (+63XXXXXXXXXX)
    // style Philippine mobile numbers, digits/spaces/dashes allowed.
    const isValidPhone =
        /^(\+63|0)9\d{9}$/.test(
            phone.replace(/[\s-]/g, "")
        );

    if (!phone || !isValidPhone) {

        customerPhoneInput.classList.add("input-error");
        customerPhoneError.classList.add("visible");

        return false;

    }

    customerPhoneInput.classList.remove("input-error");
    customerPhoneError.classList.remove("visible");

    return true;

}

function validateDeliveryAddress() {

    const address = getDeliveryAddress();

    if (!address) {

        deliveryAddressInput.classList.add("input-error");
        deliveryAddressError.classList.add("visible");

        return false;

    }

    deliveryAddressInput.classList.remove("input-error");
    deliveryAddressError.classList.remove("visible");

    return true;

}

// Runs all three field validations (so every error shows at once)
// and returns whether everything is filled in correctly.
function validatePersonalInfo() {

    const isNameValid = validateCustomerName();
    const isPhoneValid = validateCustomerPhone();
    const isAddressValid = validateDeliveryAddress();

    return isNameValid && isPhoneValid && isAddressValid;

}

function isPersonalInfoComplete() {

    return Boolean(
        getCustomerName() &&
        getCustomerPhone() &&
        getDeliveryAddress()
    );

}


/* ================= SUMMARY ON THE BUTTON ================= */

function updatePersonalInfoSummary() {

    if (isPersonalInfoComplete()) {

        personalInfoSummary.textContent =
            `${getCustomerName()} · ${getCustomerPhone()} · ${getDeliveryAddress()}`;

        personalInfoSummary.classList.add("complete");

    } else {

        personalInfoSummary.textContent =
            "Add your name, phone & address";

        personalInfoSummary.classList.remove("complete");

    }

}

updatePersonalInfoSummary();


/* ================= OPEN / CLOSE MODAL ================= */

// Remembers the last saved values so Cancel can restore them
let savedPersonalInfoSnapshot = {
    name: getCustomerName(),
    phone: getCustomerPhone(),
    address: getDeliveryAddress()
};

function openPersonalInfoModal() {

    savedPersonalInfoSnapshot = {
        name: getCustomerName(),
        phone: getCustomerPhone(),
        address: getDeliveryAddress()
    };

    personalInfoModal.classList.add("active");

}

function closePersonalInfoModal() {

    personalInfoModal.classList.remove("active");

}

personalInfoButton.addEventListener(
    "click",
    openPersonalInfoModal
);

cancelPersonalInfoBtn.addEventListener(
    "click",
    () => {

        // Restore the previously saved values, discarding any edits
        customerNameInput.value = savedPersonalInfoSnapshot.name;
        customerPhoneInput.value = savedPersonalInfoSnapshot.phone;
        deliveryAddressInput.value = savedPersonalInfoSnapshot.address;

        customerNameInput.classList.remove("input-error");
        customerNameError.classList.remove("visible");

        customerPhoneInput.classList.remove("input-error");
        customerPhoneError.classList.remove("visible");

        deliveryAddressInput.classList.remove("input-error");
        deliveryAddressError.classList.remove("visible");

        closePersonalInfoModal();

    }
);

personalInfoModal.addEventListener(
    "click",
    event => {

        if (event.target === personalInfoModal) {

            closePersonalInfoModal();

        }

    }
);

savePersonalInfoBtn.addEventListener(
    "click",
    () => {

        if (!validatePersonalInfo()) {

            return;

        }

        localStorage.setItem(
            "customerInfo",
            JSON.stringify({
                name: getCustomerName(),
                phone: getCustomerPhone(),
                address: getDeliveryAddress()
            })
        );

        personalInfoButton.classList.remove("input-error");
        personalInfoError.classList.remove("visible");

        updatePersonalInfoSummary();

        closePersonalInfoModal();

    }
);


/* ==========================================
   ESCAPE HTML
   (delivery address is free-text user input
   and gets inserted via innerHTML, so it
   needs to be escaped first)
========================================== */

function escapeHtml(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


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
let pendingAddress = "";
let pendingCustomerName = "";
let pendingCustomerPhone = "";
let currentSelectedPaymentType = "";

checkoutButton.addEventListener(
    "click",
    () => {
        const items = cart.getItems();

        if (items.length === 0) {
            alert("Please add items to your cart first.");
            return;
        }

        if (!isPersonalInfoComplete()) {

            openPersonalInfoModal();
            validatePersonalInfo();

            personalInfoButton.classList.add("input-error");
            personalInfoError.classList.add("visible");

            return;

        }

        personalInfoButton.classList.remove("input-error");
        personalInfoError.classList.remove("visible");

        const subtotal = cart.getSubtotal();
        pendingTotal = subtotal + DELIVERY_FEE;
        pendingItems = items;
        pendingStrategy = getSelectedPaymentStrategy();
        pendingAddress = getDeliveryAddress();
        pendingCustomerName = getCustomerName();
        pendingCustomerPhone = getCustomerPhone();

        currentSelectedPaymentType = document.querySelector('input[name="payment"]:checked').value;

        // GCash / Maya: show payment QR + manual transfer details + receipt upload
        if (currentSelectedPaymentType === "gcash" || currentSelectedPaymentType === "maya") {
            openQrPaymentModal(currentSelectedPaymentType, pendingTotal);
            return;
        }

        // PayPal: simulate the real redirect -> login -> review/pay flow
        if (currentSelectedPaymentType === "paypal") {
            openFakePaypalCheckout(pendingTotal);
            return;
        }

        // Cash: finalize immediately
        finalizeOrder({});
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

        // Validation rule for PayPal: must look like a valid email address
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(detailValue);
        if (!isValidEmail) {
            alert("Invalid PayPal email! Please enter a valid email address (e.g., name@example.com).");
            return;
        }

        paymentInputModal.classList.remove("active");
        finalizeOrder({ extraDetail: detailValue });
    };
}


/* ==========================================
   GCASH / MAYA — QR PAYMENT + RECEIPT UPLOAD
========================================== */

const qrPaymentModal = document.getElementById("qrPaymentModal");
const qrModalTitle = document.getElementById("qrModalTitle");
const qrModalAmount = document.getElementById("qrModalAmount");
const qrCodeCanvas = document.getElementById("qrCodeCanvas");
const qrAccountNumber = document.getElementById("qrAccountNumber");
const qrAccountName = document.getElementById("qrAccountName");
const qrAccountAmount = document.getElementById("qrAccountAmount");
const qrRefNumber = document.getElementById("qrRefNumber");
const receiptInput = document.getElementById("receiptInput");
const receiptPreviewWrapper = document.getElementById("receiptPreviewWrapper");
const receiptPreview = document.getElementById("receiptPreview");
const removeReceiptBtn = document.getElementById("removeReceiptBtn");
const confirmQrPaymentBtn = document.getElementById("confirmQrPaymentBtn");
const cancelQrPaymentBtn = document.getElementById("cancelQrPaymentBtn");
const qrMainContent = document.getElementById("qrMainContent");
const qrVerifyingScreen = document.getElementById("qrVerifyingScreen");
const qrVerifyingSpinner = document.getElementById("qrVerifyingSpinner");
const qrVerifyIcon = document.getElementById("qrVerifyIcon");
const qrVerifyingText = document.getElementById("qrVerifyingText");

let pendingQrType = "";

function showQrScreen(screen) {

    [qrMainContent, qrVerifyingScreen].forEach(
        s => s.classList.remove("active")
    );

    screen.classList.add("active");

}

/*
Business receiving accounts.
NOTE: These are just numbers, not registered merchant
accounts, so the QR below cannot make GCash/Maya
auto-fill a transfer — see the on-screen disclaimer.
*/
const PAYMENT_ACCOUNTS = {
    gcash: { number: "09123456789", name: "FoodSprint", label: "📱 GCash Payment" },
    maya: { number: "09123456789", name: "FoodSprint", label: "🟢 Maya Payment" }
};

let pendingOrderRef = "";
let pendingReceiptDataUrl = "";

function openQrPaymentModal(type, amount) {

    const account = PAYMENT_ACCOUNTS[type];

    pendingQrType = type;
    pendingOrderRef = "ORD-" + Date.now();
    pendingReceiptDataUrl = "";

    // Always start back on the QR/receipt screen, not a leftover verifying state
    showQrScreen(qrMainContent);
    qrVerifyingSpinner.style.display = "block";
    qrVerifyIcon.style.display = "none";

    qrModalTitle.textContent = account.label;
    qrModalAmount.textContent = `Amount to pay: ₱${amount.toFixed(2)}`;
    qrAccountNumber.textContent = account.number;
    qrAccountName.textContent = account.name;
    qrAccountAmount.textContent = `₱${amount.toFixed(2)}`;
    qrRefNumber.textContent = pendingOrderRef;

    const qrPayload =
        `${type.toUpperCase()} PAYMENT\n` +
        `To: ${account.number} (${account.name})\n` +
        `Amount: PHP ${amount.toFixed(2)}\n` +
        `Ref: ${pendingOrderRef}`;

    qrCodeCanvas.innerHTML = "";

    try {

        if (typeof QRCode === "undefined") {
            throw new Error("QRCode library not loaded");
        }

        new QRCode(qrCodeCanvas, {
            text: qrPayload,
            width: 190,
            height: 190,
            colorDark: "#2B2D42",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.L
        });

    } catch (error) {

        // Never let a QR generation failure block the modal itself —
        // fall back to manual payment details instead.
        console.error("QR generation failed:", error);

        qrCodeCanvas.innerHTML =
            `<p style="font-size:12px;color:var(--gray);max-width:190px;">Couldn't generate a QR code. Please pay manually using the details below.</p>`;

    }

    // Reset receipt upload state
    receiptInput.value = "";
    receiptPreviewWrapper.style.display = "none";
    receiptPreview.src = "";
    confirmQrPaymentBtn.disabled = true;

    qrPaymentModal.classList.add("active");

}

// Read, downscale, and preview the uploaded receipt image
receiptInput.addEventListener("change", () => {

    const file = receiptInput.files[0];

    if (!file) {
        return;
    }

    if (!file.type.startsWith("image/")) {
        alert("Please upload an image file (screenshot or photo of your receipt).");
        receiptInput.value = "";
        return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {

        const img = new Image();

        img.onload = () => {

            // Downscale before storing so it stays small in localStorage
            const maxWidth = 700;
            const scale = Math.min(1, maxWidth / img.width);

            const canvas = document.createElement("canvas");
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            pendingReceiptDataUrl = canvas.toDataURL("image/jpeg", 0.7);

            receiptPreview.src = pendingReceiptDataUrl;
            receiptPreviewWrapper.style.display = "block";
            confirmQrPaymentBtn.disabled = false;

        };

        img.src = event.target.result;

    };

    reader.readAsDataURL(file);

});

removeReceiptBtn.addEventListener("click", () => {

    pendingReceiptDataUrl = "";
    receiptInput.value = "";
    receiptPreviewWrapper.style.display = "none";
    confirmQrPaymentBtn.disabled = true;

});

confirmQrPaymentBtn.addEventListener("click", () => {

    if (!pendingReceiptDataUrl) {
        alert("Please upload a screenshot of your payment receipt before confirming.");
        return;
    }

    const providerName =
        pendingQrType === "maya" ? "Maya" : "GCash";

    // Show the "verifying" screen — simulates the moment a real payment
    // gateway would be checking the transaction with GCash/Maya's servers
    // (in production this would be a webhook callback, not a fixed delay).
    qrVerifyingSpinner.style.display = "block";
    qrVerifyIcon.style.display = "none";
    qrVerifyingText.textContent = `Verifying your payment with ${providerName}...`;

    showQrScreen(qrVerifyingScreen);

    setTimeout(() => {

        // Simulated confirmation received
        qrVerifyingSpinner.style.display = "none";
        qrVerifyIcon.style.display = "block";
        qrVerifyingText.textContent = "Payment Confirmed!";

        setTimeout(() => {

            qrPaymentModal.classList.remove("active");

            finalizeOrder({
                refNumber: pendingOrderRef,
                receiptDataUrl: pendingReceiptDataUrl,
                pendingVerification: false
            });

        }, 900);

    }, 2000);

});

cancelQrPaymentBtn.addEventListener("click", () => {

    qrPaymentModal.classList.remove("active");

});

// Cancel button inside payment modal
if (cancelPaymentBtn) {
    cancelPaymentBtn.onclick = () => {
        paymentInputModal.classList.remove("active");
    };
}

/* ==========================================
   PAYPAL — SIMULATED REDIRECT CHECKOUT
   (login screen -> review/pay screen)
========================================== */

const paypalModal = document.getElementById("paypalModal");
const paypalRedirectScreen = document.getElementById("paypalRedirectScreen");
const paypalLoginScreen = document.getElementById("paypalLoginScreen");
const paypalReviewScreen = document.getElementById("paypalReviewScreen");
const paypalEmailInput = document.getElementById("paypalEmailInput");
const paypalPasswordInput = document.getElementById("paypalPasswordInput");
const paypalLoginBtn = document.getElementById("paypalLoginBtn");
const paypalCancelLoginBtn = document.getElementById("paypalCancelLoginBtn");
const paypalReviewEmail = document.getElementById("paypalReviewEmail");
const paypalReviewAddress = document.getElementById("paypalReviewAddress");
const paypalReviewAmount = document.getElementById("paypalReviewAmount");
const paypalPayNowBtn = document.getElementById("paypalPayNowBtn");
const paypalCancelReviewBtn = document.getElementById("paypalCancelReviewBtn");

let pendingPaypalEmail = "";

function showPaypalScreen(screen) {

    [paypalRedirectScreen, paypalLoginScreen, paypalReviewScreen].forEach(
        s => s.classList.remove("active")
    );

    screen.classList.add("active");

}

function closePaypalModal() {

    paypalModal.classList.remove("active");

}

function openFakePaypalCheckout(amount) {

    // Reset fields from any previous attempt
    paypalEmailInput.value = "";
    paypalPasswordInput.value = "";
    pendingPaypalEmail = "";

    showPaypalScreen(paypalRedirectScreen);

    paypalModal.classList.add("active");

    // Brief "redirecting to paypal.com" transition, like a real redirect
    setTimeout(() => {

        showPaypalScreen(paypalLoginScreen);

    }, 1100);

}

paypalLoginBtn.addEventListener("click", () => {

    const email = paypalEmailInput.value.trim();
    const password = paypalPasswordInput.value;

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValidEmail) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!password) {
        alert("Please enter your password.");
        return;
    }

    pendingPaypalEmail = email;

    paypalReviewEmail.textContent = email;
    paypalReviewAddress.textContent =
        pendingCustomerName
            ? `${pendingCustomerName} — ${pendingAddress}`
            : pendingAddress;
    paypalReviewAmount.textContent = `₱${pendingTotal.toFixed(2)}`;

    showPaypalScreen(paypalReviewScreen);

});

paypalCancelLoginBtn.addEventListener("click", closePaypalModal);
paypalCancelReviewBtn.addEventListener("click", closePaypalModal);

paypalPayNowBtn.addEventListener("click", () => {

    closePaypalModal();

    finalizeOrder({
        extraDetail: pendingPaypalEmail
    });

});


// Helper function to complete order execution
function finalizeOrder(options = {}) {

    const {
        extraDetail = "",
        refNumber = "",
        receiptDataUrl = "",
        pendingVerification = false
    } = options;

    const paymentContext = new PaymentContext();
    paymentContext.setStrategy(pendingStrategy);

    const paymentResult = paymentContext.executePayment(pendingTotal);

    // Append user input details to message if provided
    if (extraDetail) {
        paymentResult.message += ` Account/Ref: ${extraDetail}`;
    }

    if (pendingVerification) {
        paymentResult.message += " We'll confirm your order once we verify your uploaded receipt.";
    }

    const subtotal = cart.getSubtotal();
    const finalRefNumber = refNumber || ("ORD-" + Date.now());

    // Remember this customer's info for next time
    localStorage.setItem(
        "customerInfo",
        JSON.stringify({
            name: pendingCustomerName,
            phone: pendingCustomerPhone,
            address: pendingAddress
        })
    );

    generateOrderSummary(
        pendingItems,
        subtotal,
        DELIVERY_FEE,
        pendingTotal,
        paymentResult,
        finalRefNumber,
        receiptDataUrl,
        pendingVerification,
        pendingAddress,
        pendingCustomerName,
        pendingCustomerPhone
    );

    saveLastOrder(
        pendingItems,
        pendingTotal,
        paymentResult.method,
        finalRefNumber,
        receiptDataUrl,
        pendingVerification,
        pendingAddress,
        pendingCustomerName,
        pendingCustomerPhone
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

    payment,

    refNumber = "",

    receiptDataUrl = "",

    pendingVerification = false,

    address = "",

    customerName = "",

    customerPhone = ""

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

        ${
            customerName
                ? `
        <div class="summary-item">
            <span>👤 Name</span>
            <span>${escapeHtml(customerName)}</span>
        </div>
        `
                : ""
        }

        ${
            customerPhone
                ? `
        <div class="summary-item">
            <span>📞 Phone</span>
            <span>${escapeHtml(customerPhone)}</span>
        </div>
        `
                : ""
        }

        ${
            address
                ? `
        <div class="summary-item">
            <span>📍 Deliver to</span>
            <span>${escapeHtml(address)}</span>
        </div>
        `
                : ""
        }

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

        ${
            refNumber
                ? `
        <div class="summary-item">
            <span>Reference No.</span>
            <span>${refNumber}</span>
        </div>
        `
                : ""
        }

        <div class="summary-total">

            <span>
                Total
            </span>

            <span>
                ₱${total.toFixed(2)}
            </span>

        </div>

    `;


    if (pendingVerification) {

        finalOrderSummary.innerHTML += `
            <div class="pending-badge">
                ⏳ Pending Verification
            </div>
        `;

    }


    if (receiptDataUrl) {

        finalOrderSummary.innerHTML += `
            <div class="summary-receipt">
                <p>Uploaded receipt:</p>
                <img src="${receiptDataUrl}" alt="Uploaded payment receipt">
            </div>
        `;

    }


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

    paymentMethod,

    refNumber = "",

    receiptDataUrl = "",

    pendingVerification = false,

    address = "",

    customerName = "",

    customerPhone = ""

) {

    const order = {

        orderNumber:
            refNumber ||
            ("ORD-" + Date.now()),

        customerName:
            customerName,

        customerPhone:
            customerPhone,

        deliveryAddress:
            address,

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

        status:
            pendingVerification
                ? "Pending Verification"
                : "Confirmed",

        receipt:
            receiptDataUrl || null,

        date:
            new Date()
                .toLocaleString()

    };


    try {

        localStorage.setItem(

            "lastRestaurantOrder",

            JSON.stringify(
                order
            )

        );

    } catch (error) {

        // Receipt image may be too large for localStorage — retry without it
        order.receipt = null;

        localStorage.setItem(
            "lastRestaurantOrder",
            JSON.stringify(order)
        );

    }

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