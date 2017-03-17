import pathHelper from './pathHelper';

const nodemailer = require('nodemailer');
const EmailTemplate = require('email-templates').EmailTemplate;

const emailTransport = nodemailer.createTransport();

function renderTemplate(name, data) {
  const templateDir = pathHelper.getDataRelative('emails', name);
  const template = new EmailTemplate(templateDir);

  return new Promise((resolve, reject) => {
    template.render(data, (err, result) => {
      if (err) reject(err);

      return resolve(result);
    });
  });
}


function sendEmail(emailOptions) {
  return new Promise((resolve, reject) => {
    emailTransport.sendMail(emailOptions, (error, info) => {
      if (error) return Promise.reject(error);
      return info;
    });
  });
}

function sendEmailTemplate(templateName, data, emailData) {
  return renderTemplate(templateName, data)
        .then((res) => {
          emailData.html = res.html;

          if (!emailData.subject) emailData.subject = res.subject;

          return new Promise((resolve, reject) => {
            emailTransport.sendMail(emailData, (err, info) => {
              if (err) return reject(err);

              return resolve(info);
            });
          });
        });
}

export default {
  sendEmail,
  sendEmailTemplate,
};
