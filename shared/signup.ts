import * as Validator from "validator";
import * as _ from "lodash";
import {UserSignupData, UserSignupErrors} from "../src/types/User";

export default function signupValidation(data: UserSignupData): {errors: UserSignupErrors, isValid: boolean} {
  const errors: UserSignupErrors = {};

  if (Validator.isEmpty(data.username)) {
    errors.username = "This field is required";
  }
  if (!Validator.isAlphanumeric(data.username)) {
    errors.username = "Login can contain only english letters and numbers";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "This field is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "This field is required";
  }
  if (Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = "This field is required";
  }
  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = "Passwords must match";
  }
  if (Validator.isEmpty(data.timezone)) {
    errors.timezone = "This field is required";
  }

  return {
    errors,
    isValid: _.isEmpty(errors),
  };
}
