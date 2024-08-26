const addToCartModel = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
    try {
        const { productId } = req.body;
        const currentUser = req.userId;

        console.log("Current User ID:", currentUser);
        console.log("Product ID:", productId);

        // Check if the product is already in the cart for the current user
        const isProductAvailable = await addToCartModel.findOne({ productId, userId: currentUser });

        console.log("isProductAvailable:", isProductAvailable);

        if (isProductAvailable) {
            return res.json({
                message: "Product already exists in the cart",
                success: false,
                error: true
            });
        }

        // If the product is not in the user's cart, add it
        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser,
        };

        const newAddToCart = new addToCartModel(payload);
        const saveProduct = await newAddToCart.save();

        return res.json({
            data: saveProduct,
            message: "Product added to cart",
            success: true,
            error: false
        });

    } catch (err) {
        console.log("Error occurred:", err.message || err);
        res.json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = addToCartController;
