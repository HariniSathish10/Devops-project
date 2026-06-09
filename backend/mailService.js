const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
console.log("Sending email...");
const sendOrderAlert = async (order) => {
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
};

module.exports = { sendOrderAlert };
