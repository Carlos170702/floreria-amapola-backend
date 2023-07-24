const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "floreriaamapolatec@gmail.com",
    pass: process.env.PASS_GOOGLE,
  },
});

async function recoveryPass(email, pass) {
  const info = await transporter.sendMail({
    from: '"Recuperacion de contraseña" floreriaamapolatec@gmail.com    ',
    to: email,
    subject: "Recuperar contraseña",
    text: "Floreria Amapola",
    html: `<b>Esta es tu nueva contraseña ${pass}</b>`,
  });

}

module.exports = {
  recoveryPass,
};
