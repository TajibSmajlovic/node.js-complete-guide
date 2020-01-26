const mongoose = require("mongoose");

const Product = require("./product");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                quantity: { type: Number, required: true }
            }
        ]
        // required: true
    }
});

userSchema.methods.addToCart = function(product) {
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    const cartProductIndex = this.cart.items.findIndex(
        cp => cp.productId.toString() === product._id.toString()
    );

    if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({
            productId: product._id,
            quantity: newQuantity
        });
    }

    this.cart = { items: updatedCartItems };

    return this.save();
};

userSchema.methods.removeFromCart = function(productId) {
    const updatedCartItems = this.cart.items.filter(
        item => item.productId.toString() !== productId.toString()
    );

    this.cart = { items: updatedCartItems };

    return this.save();
};

userSchema.methods.clearCart = function() {
    this.cart = { items: [] };

    return this.save();
};

module.exports = mongoose.model("User", userSchema);
