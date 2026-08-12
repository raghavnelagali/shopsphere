import { loadRazorpay } from "../utils/razorpay";
import {
    createRazorpayOrder,
    verifyRazorpayPayment,
} from "../services/paymentService";

function PaymentButton({ orderId, token }) {

    const handlePayment = async () => {

        try {

            // 1. Load Razorpay Checkout
            const isLoaded = await loadRazorpay();

            if (!isLoaded) {
                alert("Razorpay SDK failed to load");
                return;
            }

            // 2. Create Razorpay Order
            const response = await createRazorpayOrder(
                orderId,
                token
            );

            const razorpayData = response.data;

            // 3. Configure Checkout
            const options = {

                key: razorpayData.key,

                amount: razorpayData.amount,

                currency: razorpayData.currency,

                name: "ShopSphere",

                description: "ShopSphere Order Payment",

                order_id: razorpayData.razorpayOrderId,

                handler: async function (paymentResponse) {

                    try {

                        // 4. Verify payment on backend
                        const verification =
                            await verifyRazorpayPayment(
                                {
                                    orderId: razorpayData.orderId,

                                    razorpay_payment_id:
                                        paymentResponse.razorpay_payment_id,

                                    razorpay_signature:
                                        paymentResponse.razorpay_signature,
                                },
                                token
                            );

                        if (verification.success) {

                            alert(
                                "Payment successful!"
                            );

                            console.log(
                                verification.data
                            );

                        }

                    } catch (error) {

                        console.error(
                            "Payment verification failed:",
                            error
                        );

                        alert(
                            "Payment verification failed"
                        );
                    }
                },

                prefill: {
                    name: "xyz",
                    email: "xyz@gmail.com",
                },

                theme: {
                    color: "#3399cc",
                },

                modal: {
    ondismiss: function () {
        console.log("Payment cancelled by user");
        alert("Payment cancelled");
    },
},
            };

            // 5. Open Razorpay
            const razorpay = new window.Razorpay(
                options
            );

            razorpay.open();

        } catch (error) {

            console.error(
                "Payment failed:",
                error
            );

            alert(
                "Unable to start payment"
            );
        }
    };

    return (
        <button onClick={handlePayment}>
            Pay Now
        </button>
    );
}

export default PaymentButton;