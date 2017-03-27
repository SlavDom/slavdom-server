import bcrypt from 'bcrypt';

import validateInput from '../../shared/validations/signup';
import UserRepository from '../repositories/userRepository';

async function saveUser(req, res) {
  const { errors, isValid } = validateInput(req.body);
  if (isValid) {
    const { username, password, timezone, email } = req.body;
    const passwordDigest = bcrypt.hashSync(password, 10);
    const user = { username, passwordDigest, timezone, email };
    const userRepository = new UserRepository();
    userRepository.saveUser(user)
      .then(() => res.json({ success: true }))
      .catch(err => res.status(500).json({ error: err }));
  } else {
    res.status(400).json(errors);
  }
}

export default {
  saveUser,
};
