/*
============================================
STRATEGY DESIGN PATTERN
============================================

Different payment strategies can be selected
without changing the checkout process.

Strategies:
1. Cash
2. GCash
3. Maya
4. Card
*/


/* ==========================================
   CASH STRATEGY
========================================== */

class CashPaymentStrategy {

    pay(amount) {

        return {

            method: "Cash",

            icon: "banknote",

            message:
                `Please prepare ₱${amount.toFixed(2)} for cash payment.`

        };

    }

}


/* ==========================================
   GCASH STRATEGY
========================================== */

class GCashPaymentStrategy {

    pay(amount) {

        return {

            method: "GCash",

            icon: "smartphone",

            message:
                `We received your GCash payment info for ₱${amount.toFixed(2)}.`

        };

    }

}


/* ==========================================
   MAYA STRATEGY
========================================== */

class MayaPaymentStrategy {

    pay(amount) {

        return {

            method: "Maya",

            icon: "smartphone",

            message:
                `We received your Maya payment info for ₱${amount.toFixed(2)}.`

        };

    }

}


/* ==========================================
   CARD STRATEGY
========================================== */

class CardPaymentStrategy {

    pay(amount) {

        return {

            method: "Card",

            icon: "card",

            message:
                `₱${amount.toFixed(2)} will be charged to your card.`

        };

    }

}


/* ==========================================
   PAYPAL STRATEGY
========================================== */

class PayPalPaymentStrategy {

    pay(amount) {

        return {

            method: "PayPal",

            icon: "paypalGlyph",

            message:
                `Please confirm ₱${amount.toFixed(2)} using your PayPal account.`

        };

    }

}


/* ==========================================
   PAYMENT CONTEXT
========================================== */

class PaymentContext {

    constructor(strategy = null) {

        this.strategy = strategy;

    }


    setStrategy(strategy) {

        this.strategy = strategy;

    }


    executePayment(amount) {

        if (!this.strategy) {

            throw new Error(
                "Payment strategy is not selected."
            );

        }


        return this.strategy.pay(
            amount
        );

    }

}