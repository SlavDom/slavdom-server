import * as Joi from 'joi';
import helper from './controllerHelper';
import userRepository from '../repositories/userRepository';


async function getUsers(req, res) {
  try {
    const search = req.query.search;
    const sortOrder = req.query.sortOrder;
    const pageNumber = req.query.pageNumber;
    const pageSize = req.query.pageSize;

    const result = await userRepository.getUsers();

    return helper.sendData({ data: result }, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

async function getUser(req, res) {
  try {
    const id = req.query.id;
        // userRepository.init(dbInit.init());
    const student = await userRepository.getById(id);

    return helper.sendData({ data: student }, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

async function saveUser(req, res) {
  try {
    const data = req.body.student;

    const schema = {
      email: Joi.email().required,
      profile: Joi.join().required,
    };

    let result = null;

    const user = await helper.loadSchema(data, schema);
    result = await userRepository.addUser(user);
    return helper.sendData({ data: result }, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

async function deleteUser(req, res) {
  try {
    const id = req.body.id;

        // await userRepository.deleteUser(id);

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
