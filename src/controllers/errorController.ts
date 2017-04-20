import helper from './controllerHelper';

async function send(req, res) {
  try {
    return helper.sendFailureMessage('404 error', res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

export default {
  send,
};
