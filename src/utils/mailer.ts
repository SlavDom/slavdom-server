import * as nodemailer from "nodemailer";

function sendMail(from: string, subject: string, text: string): object {
  const smtpConfig = {
    host: "smtp.yandex.ru",
    port: 465,
    secure: true,
    auth: {
      user: "test.slavdom@yandex.ru",
      pass: "qwerty12345",
    },
  };
  const transport = nodemailer.createTransport(smtpConfig);
  const message = {
    from: "test.slavdom@yandex.ru",
    to: "test.slavdom@yandex.ru",
    subject,
    text: `From ${from}: ${text}`,
    html: `<p>From: ${from}</p><p>Text message: ${text}</p>`,
  };
  return transport.sendMail(message);
}

export {
  sendMail,
};
