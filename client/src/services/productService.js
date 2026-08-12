import api from "./api";

export const getProducts = async (params = {}) => {
    const response = await api.get("/products", {
        params,
    });

    return response.data;
};

export const getProductById = async (id) => {
    const response = await api.get(
        `/products/${id}`
    );

    return response.data;
};

export const getFeaturedProducts = async () => {

    const response = await api.get(
        "/products/featured"
    );

    return response.data;
};