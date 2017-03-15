import pathHelper from './pathHelper';

const nodemailer = require('nodemailer');
const EmailTemplate = require('email-templates').EmailTemplate;

const emailTransport = nodemailer.createTransport();

export default {
    sendEmail,
    sendEmailTemplate
};

interface EmailOptions {
    from: string,
    to: string,
    subject?: string,
    text?: string,
    html?: string
}

function sendEmail(emailOptions) {
    return new Promise<Object>((resolve, reject) => {
        emailTransport.sendMail(emailOptions, function (error, info) {
            if (error) return Promise.reject(error);
            return info;
        });
    });
}

function sendEmailTemplate(templateName, data, emailData) {
    return renderTemplate(templateName, data)
        .then((data) => {
            emailData.html = data.html;

            if (!emailData.subject) emailData.subject = data.subject;

            return new Promise((resolve, reject) => {
                emailTransport.sendMail(emailData, function (err, info) {
                    if (err) return reject(err);

                    return resolve(info);
                });
            });
        });
}

function renderTemplate(name, data) {
    let templateDir = pathHelper.getDataRelative('emails', name);
    let template = new EmailTemplate(templateDir);

    return new Promise<any>((resolve, reject) => {
        template.render(data, function (err, result) {
            if (err) reject(err);

            return resolve(result);
        });
    });
}