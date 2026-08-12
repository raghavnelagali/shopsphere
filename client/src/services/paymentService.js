import api from "./api";

export const createRazorpayOrder = async (
    orderId
) => {

    const response = await api.post(
        "/orders/payment/create",
        {
            orderId,
        }
    );

    return response.data;
};


export const verifyRazorpayPayment = async (
    paymentData
) => {

    const response = await api.post(
        "/orders/payment/verify",
        paymentData
    );

    return response.data;
};