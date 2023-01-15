import path from "path";
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";

export const VerifyEmail = async (email: any, subject: any, text: any) => {
  try {
    var transporter = nodemailer.createTransport({
      host: String(process.env.HOST),
      service: String(process.env.SERVICE),
      port: Number(process.env.MAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: String(process.env.MAIL_CENTER),
        pass: String(process.env.MAIL_PASS),
      },
    });

    const handlebarOptions: any = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.join(__dirname, "../../src/views"),
        defaultLayout: false,
      },
      viewPath: path.join(__dirname, "../../src/views"),
      extName: ".handlebars",
    };

    transporter.use("compile", hbs(handlebarOptions));

    var mailOptions = {
      from: `Pet Adobtion 🐕 <${process.env.MAIL_CENTER}>`,
      to: email,
      subject: subject,
      template: "verify-email",
      context: {
        title: "Pet Adoption Account",
        text: text,
      },
    };
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.log(`Email couldn't sent!`);
    console.log(error);
  }
};
