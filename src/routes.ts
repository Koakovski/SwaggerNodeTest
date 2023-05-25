import { Router } from "express";

import { v4 as uuidv4 } from "uuid";
import { authenticationMiddleware } from "./middleware";

const router = Router();

interface ProductDTO {
    id: string;
    name: string;
    description: string;
    price: number;
}

const products: ProductDTO[] = [];

router.get("/product/findByName", (request, response) => {
    const { name } = request.query;
    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(String(name).toLowerCase())
    );

    return response.json(filteredProducts);
});

router.get("/product/:productId", (request, response) => {
    const { productId } = request.params;
    const filteredProduct = products.find((p) => p.id === productId);

    return response.json(filteredProduct);
});

router.post("/product", authenticationMiddleware, (request, response) => {
    const { name, description, price } = request.body;

    const productAlreadyExists = products.some((p) => p.name === name);
    if (productAlreadyExists) {
        return response.status(400).json({ message: "Product already exists" });
    }

    const productsData: ProductDTO = {
        description,
        name,
        price,
        id: uuidv4(),
    };

    products.push(productsData);

    return response.json(productsData);
});

router.post("/product/:productId", authenticationMiddleware, (request, response) => {
    const { productId } = request.params;
    const { name, description, price } = request.body;

    const productIndex = products.findIndex((p) => p.id === productId);

    if (productIndex === -1) {
        return response.status(400).json({ message: "No product found!" });
    }

    products[productIndex] = {
        ...products[productIndex],
        name,
        description,
        price,
    };

    return response.json(products[productIndex]);
});

export { router };
