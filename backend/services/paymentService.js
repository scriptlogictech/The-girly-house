const crypto = require("crypto");

const razorpay = require("../config/razorpay");

// =====================================================
// CREATE RAZORPAY ORDER
// =====================================================

const createRazorpayOrder = async ({
  amount,
  receipt,
  notes = {},
}) => {
  try {
    if (
      typeof amount !== "number" ||
      amount <= 0
    ) {
      throw new Error(
        "Invalid payment amount."
      );
    }

    const options = {
      amount:
        Math.round(amount * 100),

      currency: "INR",

      receipt:
        receipt ||
        `GH_${Date.now()}`,

      notes,
    };

    const order =
      await razorpay.orders.create(
        options
      );

    return order;
  } catch (error) {
    console.error(
      "Razorpay Create Order Error:",
      error
    );

    throw new Error(
      error?.error?.description ||
        error?.message ||
        "Unable to create Razorpay order."
    );
  }
};

// =====================================================
// GET RAZORPAY ORDER
// =====================================================

const getRazorpayOrder = async (
  razorpayOrderId
) => {
  try {
    if (!razorpayOrderId) {
      throw new Error(
        "Razorpay order ID is required."
      );
    }

    const order =
      await razorpay.orders.fetch(
        razorpayOrderId
      );

    return order;
  } catch (error) {
    console.error(
      "Razorpay Fetch Order Error:",
      error
    );

    throw new Error(
      error?.error?.description ||
        error?.message ||
        "Unable to fetch Razorpay order."
    );
  }
};

// =====================================================
// GET RAZORPAY PAYMENT
// =====================================================

const getRazorpayPayment = async (
  razorpayPaymentId
) => {
  try {
    if (!razorpayPaymentId) {
      throw new Error(
        "Razorpay payment ID is required."
      );
    }

    const payment =
      await razorpay.payments.fetch(
        razorpayPaymentId
      );

    return payment;
  } catch (error) {
    console.error(
      "Razorpay Fetch Payment Error:",
      error
    );

    throw new Error(
      error?.error?.description ||
        error?.message ||
        "Unable to fetch Razorpay payment."
    );
  }
};

// =====================================================
// VERIFY RAZORPAY SIGNATURE
// =====================================================

const verifyRazorpayPayment = ({
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}) => {
  try {
    if (!razorpayOrderId) {
      throw new Error(
        "Razorpay order ID is required."
      );
    }

    if (!razorpayPaymentId) {
      throw new Error(
        "Razorpay payment ID is required."
      );
    }

    if (!razorpaySignature) {
      throw new Error(
        "Razorpay signature is required."
      );
    }

    const keySecret =
      process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      throw new Error(
        "Razorpay secret key is not configured."
      );
    }

    const generatedSignature =
      crypto
        .createHmac(
          "sha256",
          keySecret
        )
        .update(
          `${razorpayOrderId}|${razorpayPaymentId}`
        )
        .digest("hex");

    const generatedBuffer =
      Buffer.from(
        generatedSignature,
        "utf8"
      );

    const receivedBuffer =
      Buffer.from(
        razorpaySignature,
        "utf8"
      );

    if (
      generatedBuffer.length !==
      receivedBuffer.length
    ) {
      return false;
    }

    return crypto.timingSafeEqual(
      generatedBuffer,
      receivedBuffer
    );
  } catch (error) {
    console.error(
      "Razorpay Payment Verification Error:",
      error
    );

    return false;
  }
};

// =====================================================
// VERIFY PAYMENT AMOUNT
// =====================================================

const verifyPaymentAmount = ({
  razorpayOrder,
  expectedAmount,
}) => {
  if (!razorpayOrder) {
    return false;
  }

  if (
    typeof expectedAmount !==
    "number"
  ) {
    return false;
  }

  const expectedAmountInPaise =
    Math.round(
      expectedAmount * 100
    );

  return (
    Number(
      razorpayOrder.amount
    ) === expectedAmountInPaise
  );
};

// =====================================================
// VERIFY PAYMENT CAPTURED
// =====================================================

const verifyPaymentCaptured = (
  payment
) => {
  if (!payment) {
    return false;
  }

  return (
    payment.status ===
    "captured"
  );
};

// =====================================================
// EXPORTS
// =====================================================

module.exports = {
  createRazorpayOrder,

  getRazorpayOrder,

  getRazorpayPayment,

  verifyRazorpayPayment,

  verifyPaymentAmount,

  verifyPaymentCaptured,
};