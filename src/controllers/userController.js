import helper from './controllerHelper';
import userRepository from '../repositories/userRepository';
import * as Joi from 'joi';

export default {
    getUsers,
    getUser,
    saveUser,
    deleteUser
};

async function getUsers(req, res) {
    try {
        let search = req.query.search;
        let sortOrder = req.query.sortOrder;
        let pageNumber = req.query.pageNumber;
        let pageSize = req.query.pageSize;
        
        let result = await userRepository.getUsers();

        return helper.sendData({data: result}, res);
    } catch (err) {
        helper.sendFailureMessage(err, res);
    }
}

async function getUser(req, res) {
    try {
        let id = req.query.id;
        // userRepository.init(dbInit.init());
        let student = await userRepository.getById(id);

        return helper.sendData({data: student}, res);
    } catch (err) {
        helper.sendFailureMessage(err, res);
    }
}

async function saveUser(req, res) {
    try {
        let data = req.body.student;

        let schema = {
            email: Joi.email().required,
            profile: Joi.join().required
        };

        let result = null;

        let user = await helper.loadSchema(data, schema);
        result = await userRepository.addUser(user);
        return helper.sendData({data: result}, res);
    } catch (err) {
        helper.sendFailureMessage(err, res);
    }
}

async function deleteUser(req, res) {
    try {
        let id = req.body.id;

        // await userRepository.deleteUser(id);

        return helper.sendData({}, res);
    } catch (err) {
        helper.sendFailureMessage(err, res);
    }
}