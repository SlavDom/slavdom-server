import userRepository from '../repositories/userRepository';
import authControllerInit from './authController';

export default function initPassport(passport) {
  authControllerInit(passport);

    // passport session setup
    // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

    // used to deserialize the user
  passport.deserializeUser((id, done) => {
    userRepository.getById(id)
            .then((user) => {
              done(null, user);
            })
            .catch((err) => {
              done(err, null);
            });
  });
}
