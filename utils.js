import nodemailer from "nodemailer";

export const sendMail = async (token, email) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rt2tyagi4366@gmail.com",
        pass: "zxgwqvztssxfjlmu",
      },
    });

    await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>',
      to: email,
      subject: `TOken for the usr varification`,
      text: ` Hi \n Here is your token ${token} `,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("ni gya");
  }
};
