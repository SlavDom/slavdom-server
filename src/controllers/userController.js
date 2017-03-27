import bcrypt from 'bcrypt';
import isEmpty from 'lodash/isEmpty';

import commonValidation from '../../shared/validations/signup';
import UserRepository from '../repositories/userRepository';

function validateInput(data, otherValidations) {
  const { errors } = otherValidations(data);
  const userRepository = new UserRepository();
  return userRepository.checkUniqueness(data.username, data.email).then((user) => {
    if (user) {
      if (user.username === data.username) {
        errors.username = 'Sorry, this username has been taken';
      }
      if (user.email === data.email) {
        errors.email = 'Email is already registered';
      }
    }
    return {
      errors,
      isValid: isEmpty(errors),
    };
  });
}

async function saveUser(req, res) {
  validateInput(req.body, commonValidation).then(({ errors, isValid }) => {
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
  });
}

export default {
  saveUser,
};
