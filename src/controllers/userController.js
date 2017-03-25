import validateInput from '../../shared/validations/signup';

async function saveUser(req, res) {
  const { errors, isValid } = validateInput(req.body);
  if (!isValid) {
    res.status(400).json(errors);
  }
  res.status(200).json();
}

export default {
  saveUser,
};
