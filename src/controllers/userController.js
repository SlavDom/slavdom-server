import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

import helper from './controllerHelper';
import userRepository from '../repositories/userRepository';

function validateInput(data) {
  const errors = {};

  if (Validator.isEmpty(data.username)) {
    errors.username = 'This field is required';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  if (Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'This field is required';
  }
  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match';
  }
  if (Validator.isEmpty(data.timezone)) {
    errors.timezone = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

async function getUsers(req, res) {
  try {
    const result = await userRepository.getUsers();
    return helper.sendData({ data: result }, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

async function getUser(req, res) {
  try {
    const id = req.query.id;
    const student = await userRepository.getById(id);
    return helper.sendData({ data: student }, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

async function saveUser(req, res) {
  const { errors, isValid } = validateInput(req.body);
  if (!isValid) {
    res.status(400).json(errors);
  }
  res.status(200).json();
}

async function deleteUser(req, res) {
  try {
    return helper.sendData({}, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

export default {
  getUsers,
  getUser,
  saveUser,
  deleteUser,
};
