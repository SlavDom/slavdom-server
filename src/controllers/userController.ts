import * as bcrypt from 'bcrypt';

import UserRepository from '../repositories/userRepository';

async function saveUser(req, res) {
  const passwordDigest = bcrypt.hashSync(req.body.password, 10);
  const username = req.body.username.toLowerCase();
  const email = req.body.email.toLowerCase();
  const timezone = req.body.timezone;
  const user = { username, passwordDigest, timezone, email };
  const userRepository = new UserRepository();
  userRepository.saveUser(user)
    .then(() => res.json({ success: true }))
    .catch(err => res.status(500).json({ error: err }));
}

function ajaxCheck(req, res) {
  const userRepository = new UserRepository();
  return userRepository.checkUniqueness(req.params.identifier.toLowerCase(), req.params.identifier.toLowerCase())
    .then(user => res.json({ user }));
}

export default {
  saveUser,
  ajaxCheck,
};
