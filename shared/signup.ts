import * as Validator from "validator";
import {UserSignupData, UserSignupErrors} from "../src/types/User";

export default function signupValidation(data: UserSignupData, field: string|undefined, errors: UserSignupErrors):
  UserSignupErrors {

  if ((field === "username" || typeof field === "undefined") && data.username.touched) {
    errors.username = undefined;
    if (Validator.isEmpty(data.username.value)) {
      errors.username = "This field is required";
    }
    if (!Validator.isAlphanumeric(data.username.value)) {
      errors.username = "Login can contain only english letters and numbers";
    }
  }
  if ((field === "email"  || typeof field === "undefined") && data.email.touched) {
    errors.email = undefined;
    if (Validator.isEmpty(data.email.value)) {
      errors.email = "This field is required";
    }
    if (!Validator.isEmail(data.email.value)) {
      errors.email = "Email is invalid";
    }
  }
  if ((field === "password"  || typeof field === "undefined") && data.password.touched) {
    errors.password = undefined;
    if (Validator.isEmpty(data.password.value)) {
      errors.password = "This field is required";
    }
  }
  if ((field === "passwordConfirmation" || typeof field === "undefined") && data.passwordConfirmation.touched) {
    errors.passwordConfirmation = undefined;
    if (Validator.isEmpty(data.passwordConfirmation.value)) {
      errors.passwordConfirmation = "This field is required";
    }
    if (!Validator.equals(data.password.value, data.passwordConfirmation.value)) {
      errors.passwordConfirmation = "Passwords must match";
    }
  }
  if ((field === "timezone"  || typeof field === "undefined") && data.timezone.touched) {
    errors.timezone = undefined;
    if (Validator.isEmpty(data.timezone.value)) {
      errors.timezone = "This field is required";
    }
  }

  return errors;
}
