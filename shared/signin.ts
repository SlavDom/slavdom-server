import * as Validator from "validator";
import * as _ from "lodash";
import {UserSigninData, UserSigninErrors} from "../src/types/User";

export default function signinValidation(data: UserSigninData): {errors: UserSigninErrors, isValid: boolean} {
  const errors: UserSigninErrors = {};

  if (Validator.isEmpty(data.identifier)) {
    errors.identifier = "This field is required";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "This field is required";
  }

  return {
    errors,
    isValid: _.isEmpty(errors),
  };
}
