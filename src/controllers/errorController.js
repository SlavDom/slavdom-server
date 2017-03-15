import helper from './controllerHelper';

export default {
    send
};

async function send(req, res) {
    try {
        return helper.sendFailureMessage('404 error', res)
    } catch (err) {
        helper.sendFailureMessage(err, res);
    }
}