const SibApiV3Sdk = require("sib-api-v3-sdk");

// ==========================================
// BREVO CONFIGURATION
// ==========================================

const defaultClient = SibApiV3Sdk.ApiClient.instance;

const apiKey = defaultClient.authentications["api-key"];

apiKey.apiKey = process.env.BREVO_API_KEY;

// ==========================================
// SEND OTP EMAIL
// ==========================================

const sendOtpEmail = async ({ email, name, otp }) => {
  try {
    if (!process.env.BREVO_API_KEY) {
      throw new Error("BREVO_API_KEY is not configured.");
    }

    if (!process.env.BREVO_SENDER_EMAIL) {
      throw new Error(
        "BREVO_SENDER_EMAIL is not configured."
      );
    }

    const apiInstance =
      new SibApiV3Sdk.TransactionalEmailsApi();

    const sendSmtpEmail =
      new SibApiV3Sdk.SendSmtpEmail();

    // Sender
    sendSmtpEmail.sender = {
      email: process.env.BREVO_SENDER_EMAIL,
      name:
        process.env.BREVO_SENDER_NAME ||
        "The Girly House By Manisha",
    };

    // Recipient
    sendSmtpEmail.to = [
      {
        email,
        name: name || "Customer",
      },
    ];

    // Email subject
    sendSmtpEmail.subject =
      "Your OTP - The Girly House By Manisha";

    // Plain text version
    sendSmtpEmail.textContent = `
Hello ${name || "Customer"},

Your OTP for The Girly House By Manisha is:

${otp}

This OTP is valid for 5 minutes.

Please do not share this OTP with anyone.

Thank you,
The Girly House By Manisha
`;

    // HTML version
    sendSmtpEmail.htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Verification</title>
</head>

<body
  style="
    margin: 0;
    padding: 0;
    background-color: #f9f4ec;
    font-family: Arial, Helvetica, sans-serif;
  "
>
  <div
    style="
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    "
  >

    <!-- Header -->
    <div
      style="
        background-color: #6b1028;
        padding: 30px 20px;
        text-align: center;
      "
    >
      <h1
        style="
          margin: 0;
          color: #ffffff;
          font-size: 28px;
          font-family: Georgia, serif;
        "
      >
        The Girly House
      </h1>

      <p
        style="
          margin: 8px 0 0;
          color: #f9f4ec;
          font-size: 14px;
        "
      >
        By Manisha
      </p>
    </div>

    <!-- Content -->
    <div
      style="
        padding: 35px 30px;
        text-align: center;
      "
    >

      <h2
        style="
          color: #333333;
          margin-top: 0;
          font-size: 24px;
        "
      >
        Verify Your Email
      </h2>

      <p
        style="
          color: #666666;
          font-size: 15px;
          line-height: 1.6;
        "
      >
        Hello ${name || "Customer"},
      </p>

      <p
        style="
          color: #666666;
          font-size: 15px;
          line-height: 1.6;
        "
      >
        Thank you for registering with
        <strong>The Girly House By Manisha</strong>.
        Use the OTP below to verify your email address.
      </p>

      <!-- OTP -->
      <div
        style="
          margin: 30px auto;
          display: inline-block;
          padding: 18px 35px;
          background-color: #f9f4ec;
          border: 2px dashed #6b1028;
          border-radius: 10px;
        "
      >
        <div
          style="
            color: #777777;
            font-size: 12px;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 2px;
          "
        >
          Your OTP
        </div>

        <div
          style="
            color: #6b1028;
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
          "
        >
          ${otp}
        </div>
      </div>

      <p
        style="
          color: #777777;
          font-size: 14px;
          line-height: 1.6;
        "
      >
        This OTP is valid for
        <strong>5 minutes</strong>.
      </p>

      <p
        style="
          color: #999999;
          font-size: 13px;
          line-height: 1.6;
        "
      >
        For your security, please do not share this OTP with anyone.
      </p>

    </div>

    <!-- Footer -->
    <div
      style="
        background-color: #f9f4ec;
        padding: 20px;
        text-align: center;
      "
    >
      <p
        style="
          margin: 0;
          color: #6b1028;
          font-size: 13px;
        "
      >
        © ${new Date().getFullYear()}
        The Girly House By Manisha
      </p>
    </div>

  </div>
</body>
</html>
`;

    // Send email through Brevo
    const response =
      await apiInstance.sendTransacEmail(
        sendSmtpEmail
      );

    console.log(
      `OTP email sent successfully to ${email}`
    );

    return {
      success: true,
      message: "OTP email sent successfully.",
      data: response,
    };
  } catch (error) {
    console.error(
      "Brevo OTP Email Error:",
      error?.response?.body ||
        error?.response ||
        error?.message ||
        error
    );

    throw new Error(
      "Unable to send OTP email. Please try again."
    );
  }
};

module.exports = {
  sendOtpEmail,
};