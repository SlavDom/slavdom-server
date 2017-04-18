import nodemailer from 'nodemailer';

async function sendMail(from, subject, text) {
  const smtpConfig = {
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
      user: 'test.slavdom@yandex.ru',
      pass: 'qwerty12345',
    },
  };
  const transport = nodemailer.createTransport(smtpConfig);
  const message = {
    from: 'test.slavdom@yandex.ru',
    to: 'test.slavdom@yandex.ru',
    subject,
    text: `From ${from}: ${text}`,
    html: `<p>From: ${from}</p><p>Text message: ${text}</p>`,
  };
  const result = await transport.sendMail(message);
  return result;
}

export {
  sendMail,
};
