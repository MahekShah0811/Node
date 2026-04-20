const productService = require("../services/product.service");
const productModel = require("../models/product.model");

// add new products
module.exports.createProduct = async (req, res) => {
     const {   
        name, 
        description, 
        stock, 
        price, 
        discount, 
        isNewProduct, 
        sku, 
        images, 
        brand, 
        category 
    } = req.body;

    const isExist = await productModel.findOne({ sku: sku });
    if(isExist){
        return res.status(400).json({ message: "Product Already Registered!!" });
    }

    const product = await productService.createProduct({
        name, 
        description, 
        stock, 
        price, 
        discount, 
        isNewProduct,  
        sku, 
        images, 
        brand, 
        category
    });

    return res.status(200).json({ message: "Product Added Sucessfully!!", product });
};

// add single product
module.exports.singleProduct = async (req, res) => {
    try {
        const product = await productService.singleProduct(req.params.id);
        if(!product){
            return res.status(404).json({ message: "Product Not Found!!" });
        }
        return res.status(200).json({ message: "Product Found!!", product });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// all products
module.exports.allProduct = async (req, res) => {
    try {
        const products = await productService.AllProduct();
        if(!products){
            return res.status(404).json({ message: "Products Are Not Found!!" });
        }
        return res.status(200).json({ message: "Fetch All Products", products });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
