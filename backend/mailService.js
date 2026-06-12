const nodemailer = require("nodemailer");
console.log("EMAIL_USER =", process.env.EMAIL_USER);
console.log("ADMIN_EMAIL =", process.env.ADMIN_EMAIL);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.gsrywqjklsftyubt
  }
});

const sendOrderAlert = async (order) => {
  try {
    console.log("Sending email...");
    console.log("sendOrderAlert function called");

    const info = await transporter.sendMail({
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
    console.log(info.response);

  } catch (error) {
    console.error("Email Error:", error);
  }
};
module.exports = { sendOrderAlert };
