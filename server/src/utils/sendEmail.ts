import { Transporter, createTransport } from "nodemailer";
import { IEmailOptions } from "../types";
import { SMTP_HOST, SMTP_MAIL, SMTP_PASSWORD, SMTP_PORT, SMTP_SERVICE } from "../constants";
import { join } from "path";
import { renderFile } from "ejs";

async function sendEmail({ email, subject, template, data }: IEmailOptions): Promise<void> {
  const transporter: Transporter = createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT || "587"),
    service: SMTP_SERVICE,
    auth: {
      user: SMTP_MAIL,
      pass: SMTP_PASSWORD,
    },
  });
  try {
    const templatePath: string = join(__dirname, "../emails/", template);
    const html: string = await renderFile(templatePath, data);
    const mailOptions = {
      from: SMTP_MAIL,
      to: email,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error sending email!", error);
  }
}

export default sendEmail;
