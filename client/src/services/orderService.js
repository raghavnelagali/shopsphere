import api from "./api";

// Place ShopSphere order
export const placeOrder = async (shippingAddress) => {
    const response = await api.post(
        "/orders",
        shippingAddress
    );

    return response.data;
};


// Get logged-in user's orders
export const getMyOrders = async () => {
    const response = await api.get(
        "/orders/my-orders"
    );

    return response.data;
};


// Get single order
export const getOrderById = async (id) => {
    const response = await api.get(
        `/orders/${id}`
    );

    return response.data;
};