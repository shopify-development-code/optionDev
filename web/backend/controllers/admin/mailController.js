import nodemailer from 'nodemailer';
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

export async function contactEmail(req, res) {
  try {
    const { uname, umail, shop, storePassword, message } = req.body;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const dirPath = path.join(__dirname, "../../Templates");

    console.log(dirPath, "full path....")

    console.log(process.env.EMAIL_USERNAME, "userName")

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD, // generated password
      },
    });
    const sendEmail = (emailOptions) => {
      ejs.renderFile(dirPath + "/email.ejs", { emailOptions }, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          let mailOptions = {
            from: `Genie Options`,
            to: emailOptions.emailTo,
            subject: emailOptions.emailSub,
            replyTo: emailOptions.userEmail,
            html: data,
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return res
                .status(502)
                .json({ msg: "Mail Not sent! Please try again" });
            }
            console.log("Message sent: %s", info.messageId);
            res.status(201).json({ msg: "Email has been sent successfully!" });
          });
        }
      });
    };

    var emailTemplateOptions = {
      baseUrl: process.env.HOST,
      emailTo: process.env.CONTACTUS_EMAIL_TO,
      emailSub: process.env.CONTACTUS_EMAIL_SUB,
      userName: uname,
      userEmail: umail,
      storeName: shop,
      storePass: storePassword == undefined ? false : storePassword,
      message: message,
    };
    sendEmail(emailTemplateOptions);
  } catch (err) {
    res.status(502).json({ msg: "Something went wrong! Please try again" });
  }
}
