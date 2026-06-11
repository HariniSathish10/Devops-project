const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendOrderAlert = async (order) => {
  console.log("Sending email...");
  console.log("sendOrderAlert function called");
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: "New Order Received",
    html: `
      <h2>New Order Received</h2>
      <p>Tracking Number: ${order.trackingNumber}</p>
      <p>Total Amount: ₹${order.totalPrice}</p>
      <p>Status: ${order.orderStatus}</p>
    `
  });

  console.log("Email sent successfully");
};

module.exports = { sendOrderAlert };
