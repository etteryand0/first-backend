const argon2 = require('argon2');
const ErrorEnum = require('./errorHandler');

const SignUp = async (name, email, password) => {
  const passwordHashed = await argon2.hash(password);

  const userRecord = UserModel.create({
    password: passwordHashed,
    email,
    name
  });
  
  return {
    user: {
      email: userRecord.email,
      name: userRecord.name,
    }
  };
}

const Login = async (email, password) => {
  const userRecord = await UserModel.findOne({ email });
  if (!userRecord) {
    throw new Error('User not found');
  } 

  const correctPassword = await argon2.verify(userRecord.password, password);

  if (!correctPassword) {
    throw new Error('Incorrect password');
  }
}

module.exports = {
  SignUp,
  Login
};