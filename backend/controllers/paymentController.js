const {
  createRazorpayOrder,
  getRazorpayOrder,
  getRazorpayPayment,
  verifyRazorpayPayment,
  verifyPaymentAmount,
  verifyPaymentCaptured,
} = require("../services/paymentService");

const orderService = require("../services/orderService");

// =====================================================
// CREATE RAZORPAY PAYMENT ORDER
// =====================================================

const createPaymentOrder = async (
  req,
  res,
  next
) => {
  try {
    const {
      addressId,
      couponCode,
      buyNowItem,
    } = req.body;

    // =================================================
    // VALIDATE ADDRESS
    // =================================================

    if (!addressId) {
      return res.status(400).json({
        success: false,
        message:
          "Shipping address is required.",
      });
    }

    // =================================================
    // BUILD ORDER DATA
    // =================================================

    const orderData = {
      addressId,

      couponCode,

      paymentMethod:
        "RAZORPAY",

      buyNowItem,
    };

    // =================================================
    // CALCULATE REAL ORDER AMOUNT
    // =================================================

    const paymentDetails =
      await orderService.getOrderCalculation(
        req.user._id,
        orderData
      );

    // =================================================
    // CREATE RAZORPAY ORDER
    // =================================================

    const razorpayOrder =
      await createRazorpayOrder({
        amount:
          paymentDetails.totalAmount,

        receipt:
          `GH_${Date.now()}`,

        notes: {
          userId:
            req.user._id.toString(),

          addressId:
            addressId.toString(),
        },
      });

    // =================================================
    // CREATE PENDING WEBSITE ORDER
    // =================================================

    const pendingOrder =
      await orderService.createPendingRazorpayOrder(
        {
          userId:
            req.user._id,

          orderData,

          razorpayOrderId:
            razorpayOrder.id,
        }
      );

    // =================================================
    // RESPONSE
    // =================================================

    return res.status(201).json({
      success: true,

      message:
        "Razorpay payment order created successfully.",

      data: {
        razorpayOrderId:
          razorpayOrder.id,

        amount:
          razorpayOrder.amount,

        currency:
          razorpayOrder.currency,

        orderId:
          pendingOrder.data._id,

        orderNumber:
          pendingOrder.data.orderNumber,

        keyId:
          process.env.RAZORPAY_KEY_ID,
      },
    });
  } catch (error) {
    console.error(
      "Create Razorpay Payment Order Error:",
      error
    );

    next(error);
  }
};

// =====================================================
// VERIFY RAZORPAY PAYMENT
// =====================================================

const verifyPayment = async (
  req,
  res,
  next
) => {
  try {
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    } = req.body;

    // =================================================
    // VALIDATE PAYMENT DETAILS
    // =================================================

    if (
      !razorpayOrderId ||
      !razorpayPaymentId ||
      !razorpaySignature
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Razorpay payment details are required.",
      });
    }

    // =================================================
    // FIND OUR WEBSITE ORDER
    // =================================================

    const websiteOrder =
      await orderService.getRazorpayPendingOrder(
        {
          userId:
            req.user._id,

          razorpayOrderId,
        }
      );

    // =================================================
    // FETCH RAZORPAY ORDER
    // =================================================

    const razorpayOrder =
      await getRazorpayOrder(
        razorpayOrderId
      );

    // =================================================
    // VERIFY AMOUNT
    // =================================================

    const amountValid =
      verifyPaymentAmount({
        razorpayOrder,

        expectedAmount:
          websiteOrder.data.totalAmount,
      });

    if (!amountValid) {
      return res.status(400).json({
        success: false,
        message:
          "Payment amount does not match the order amount.",
      });
    }

    // =================================================
    // VERIFY SIGNATURE
    // =================================================

    const signatureValid =
      verifyRazorpayPayment({
        razorpayOrderId,

        razorpayPaymentId,

        razorpaySignature,
      });

    if (!signatureValid) {
      return res.status(400).json({
        success: false,
        message:
          "Payment verification failed.",
      });
    }

    // =================================================
    // FETCH SPECIFIC PAYMENT
    // =================================================

    const razorpayPayment =
      await getRazorpayPayment(
        razorpayPaymentId
      );

    // =================================================
    // VERIFY PAYMENT BELONGS TO ORDER
    // =================================================

    if (
      razorpayPayment.order_id !==
      razorpayOrderId
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Payment does not belong to this order.",
      });
    }

    // =================================================
    // VERIFY PAYMENT CAPTURED
    // =================================================

    const paymentCaptured =
      verifyPaymentCaptured(
        razorpayPayment
      );

    if (!paymentCaptured) {
      return res.status(400).json({
        success: false,
        message:
          `Payment is not captured. Current status: ${razorpayPayment.status || "unknown"}.`,
      });
    }

    // =================================================
    // COMPLETE WEBSITE ORDER
    // =================================================

    const completedOrder =
      await orderService.completeRazorpayOrder(
        {
          userId:
            req.user._id,

          razorpayOrderId,

          razorpayPaymentId,
        }
      );

    // =================================================
    // SUCCESS RESPONSE
    // =================================================

    return res.status(200).json({
      success: true,

      message:
        "Payment verified and order confirmed successfully.",

      data: {
        order:
          completedOrder.data,

        razorpayOrderId,

        razorpayPaymentId,

        paymentStatus:
          razorpayPayment.status,
      },
    });
  } catch (error) {
    console.error(
      "Razorpay Payment Verification Error:",
      error
    );

    next(error);
  }
};

// =====================================================
// EXPORTS
// =====================================================

module.exports = {
  createPaymentOrder,
  verifyPayment,
};