document.addEventListener("alpine:init", () => {
    Alpine.data("pizzaCart", () => ({
        cart: false,
        mediumTotal: 0.00,
        mediumQty: 0,
        largeTotal: 0.00,
        largeQty: 0,
        smallTotal: 0.00,
        smallQty: 0,
        payNow: false,
        paymentAmount: 0,
        paymentMessage: '',


        cartTotal() {
            return this.largeTotal + this.mediumTotal + this.smallTotal
        },

        buyMediumPizza() {
            this.mediumTotal += 89.99
            this.mediumQty += 1
        },

        clearMediumPizza() {
            if (this.mediumQty > 0) {
                this.mediumTotal -= 89.99
                this.mediumQty -= 1
            }
        },

        buyLargePizza() {
            this.largeTotal += 199.99
            this.largeQty += 1
        },

        clearLargePizza() {
            if (this.largeQty > 0) {
                this.largeTotal -= 199.99
                this.largeQty -= 1
            }
        },

        buySmallPizza() {
            this.smallTotal += 58.99
            this.smallQty += 1
        },

        clearSmallPizza() {
            if (this.smallQty > 0) {
                this.smallTotal -= 58.99
                this.smallQty -= 1
            }
        },
        totalQty() {
            return this.mediumQty + this.largeQty + this.smallQty;
        },

        makePayment() {
            if (this.paymentAmount === 0 || !this.paymentAmount) {
                this.paymentMessage = 'No Amount Entered!'
            }
            else if (this.paymentAmount >= this.cartTotal()) {
                this.paymentMessage = 'Payment Successful!'

                setTimeout(() => {
                    this.payNow = false
                    this.clearCart()
                }, 4000);
            }
            else {
                this.paymentMessage = 'Insuffienct Amount!'
            }
        },

        clearCart() {
            this.mediumTotal = 0.00;
            this.mediumQty = 0;
            this.largeTotal = 0.00;
            this.largeQty = 0;
            this.smallTotal = 0.00;
            this.smallQty = 0;
            paymentAmount = 0;
            paymentMessage = '';
        },

        init() {
            //call the API to get all pizzas
            //set this.pizzas

            const pizzaCartURL = 'https://pizza-cart-api.herokuapp.com/api/pizzas';

            axios
                .get(pizzaCartURL)
                .then((result) => {
                    this.pizzas = result.data.pizzas;
                })
                .then(() => {
                   return this.creatCart();
                })
                .then((result) => {
                    this.cartId = result.data.cart_code;
                });


        },

        pizzaImg(pizza) {
            return `/Images/${pizza.flavour}.jpeg`;
        },


        creatCart() {
            
            return axios.get('https://pizza-cart-api.herokuapp.com/api/pizza-cart/create?username=' + this.username)
            
        },


        showCart() {
            const url = `https://pizza-cart-api.herokuapp.com/api/pizza-cart/${this.cartId}/get`

            axios
                .get(url)
                .then((result) => {
                    this.cart = result.data;
                });

        },

        message: '',
        username: 'Archibald',
        pizzas: [],
        cartId : '',
        cart : { total: 0 },

        add(pizza) {
            // cart Id so that user can add pizza to id
           const params = {
                cart_code: this.cartId,
                pizza_id: pizza.id
            }

            axios
                .post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/add',params)
                .then(() => {
                    this.message = "Pizza added to the cart"
                    this.showCart();
            })
        }
    }))
})