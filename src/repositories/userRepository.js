import * as _ from 'lodash';
import AppError from '../appError';

const crypto = require('crypto');
const bcrypt = require('bcrypt-nodejs');

function init(db) {
  userModel = db.models.User;
}

function updateUser(user) {
  // to notify sequelize that JSON field should be updated
  user.profile = _.clone(user.profile);

  return user.save();
}

function generateActivationToken() {
  return crypto.randomBytes(32).toString('hex');
}

function findUserWithEmail(email) {
  return userModel.findOne({ where: { email } });
}

function addUser(user) {
  return userModel.create(user);
}

function getUsers() {
  return userModel.findAll();
}

function getById(id) {
  return userModel.findById(id);
}

function getLocalUserByEmail(email) {
  return findUserWithEmail(email)
        .then(user =>
            // let noLocalProfile = !user || !user.profile.local;
            //
            // if (noLocalProfile) return null;

             user);
}

function saveLocalAccount(user, params) {
  const email = params.email;
  const password = params.password;

  const localProfile = {};

  localProfile.email = email;
  localProfile.password = userModel.generateHash(password);

  const activationToken = generateActivationToken();
  localProfile.activation = {
    token: activationToken,
    created: new Date(),
  };

  localProfile.isActivated = false;

  if (user) {
    user.email = email;
        // user.profile.local = localProfile;

    return updateUser(user);
  }
  return userModel.create({
    email,
    profile: localProfile,
  });
}

function getUserByActivationToken(token) {
  return getUsers()
        .then(users => _.find(users, user => user.profile.local &&
                user.profile.local.activation.token === token));
}

function refreshActivationToken(userId) {
  return getById(userId)
        .then((user) => {
          if (!user) throw new AppError('auth', 'user_not_found');

          user.profile.local.activation = {
            token: generateActivationToken(),
            created: new Date().toString(),
          };

          return updateUser(user);
        });
}

function activateUser(userId) {
  return getById(userId)
        .then((user) => {
          if (!user) throw new AppError('auth', 'user_not_found');

          const localProfile = user.profile.local;

          localProfile.activation = undefined;
          localProfile.isActivated = true;

          return updateUser(user);
        });
}

function comparePasswords(userId, password) {
  return getById(userId)
        .then((user) => {
          const actualPassword = user.profile.local.password;

          return bcrypt.compareSync(password, actualPassword);
        });
}

function findUserByAuthProviderId(id, provider) {
  return getUsers()
        .then(users => _.find(users, user => user.profile[provider] &&
                user.profile[provider].id === id));
}

function saveAuthProviderProfile(user, profileData, provider) {
  if (user) {
    user.email = profileData.email;
    user.profile[provider] = profileData;

    return updateUser(user);
  }
  return userModel.create({
    email: profileData.email,
    profile: {
      [provider]: profileData,
    },
  });
}

function resetPassword(userId) {
  return getById(userId)
        .then((user) => {
          if (!user) throw new AppError('Cannot find user by Id');

          user.profile.local.reset = {
            token: generateActivationToken(),
            created: new Date().toString(),
          };

          return updateUser(user);
        });
}

function getUserByResetToken(token) {
  return getUsers()
        .then(users => _.find(users, user => user.profile.local &&
                user.profile.local.reset.token === token));
}

function refreshResetToken(userId) {
  return getById(userId)
        .then((user) => {
          if (!user) throw new AppError('Cannot find user');

          user.profile.local.reset = {
            token: generateActivationToken(),
            created: new Date().toString(),
          };

          return updateUser(user);
        });
}

function updateUserPassword(userId, password) {
  return getById(userId)
        .then((user) => {
          if (!user) throw new AppError('Cannot find user');

          const localProfile = user.profile.local;

          localProfile.reset = undefined;
          localProfile.password = userModel.generateHash(password);

          return updateUser(user);
        });
}

export default {
  init,
  getUsers,
  getById,
  getLocalUserByEmail,
  findUserWithEmail,
  saveLocalAccount,
  getUserByActivationToken,
  refreshActivationToken,
  activateUser,
  comparePasswords,
  findUserByAuthProviderId,
  saveAuthProviderProfile,
  resetPassword,
  getUserByResetToken,
  refreshResetToken,
  updateUserPassword,
  addUser,
};
