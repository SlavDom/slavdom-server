import * as Validator from "validator";
import {UserSignupData, UserSignupErrors} from "../src/types/User";

export default function signupValidation(
  data: UserSignupData, field: string|undefined, errors: UserSignupErrors,
): UserSignupErrors {

  if ((field === "username" || typeof field === "undefined") && data.username.touched) {
    errors.username = undefined;
    if (Validator.isEmpty(data.username.value)) {
      errors.username = "This field is required";
    } else if (!Validator.isLength(data.username.value, {min: 4, max: 32})) {
      errors.username = "Login should be in 4 and 32 symbols";
    } else if (!Validator.isAlphanumeric(data.username.value)) {
      errors.username = "Login can contain only latin letters and numbers";
    }
  }
  if ((field === "email"  || typeof field === "undefined") && data.email.touched) {
    errors.email = undefined;
    if (Validator.isEmpty(data.email.value)) {
      errors.email = "This field is required";
    } else if (!Validator.isEmail(data.email.value)) {
      errors.email = "Email is invalid";
    }
  }
  if ((field === "password"  || typeof field === "undefined") && data.password.touched) {
    errors.password = undefined;
    if (Validator.isEmpty(data.password.value)) {
      errors.password = "This field is required";
    } else if (!Validator.isAlphanumeric(data.password.value)) {
      errors.username = "Password can contain only latin letters and numbers";
    } else if (!data.password.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)) {
      errors.password = "Password must contain at least one lowercase letter, one uppercase letter and one digit";
    } else if (!Validator.isLength(data.password.value, {min: 6, max: undefined})) {
      errors.password = "Password should have more than 6 symbols";
    }
  }
  if ((field === "passwordConfirmation" || typeof field === "undefined") && data.passwordConfirmation.touched) {
    errors.passwordConfirmation = undefined;
    if (Validator.isEmpty(data.passwordConfirmation.value)) {
      errors.passwordConfirmation = "This field is required";
    } else if (!Validator.equals(data.password.value, data.passwordConfirmation.value)) {
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
