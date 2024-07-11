const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A user must have a name'],
      minlength: [5, 'A username must be longer than 5 characters'],
      maxlength: [20, 'A username must be shorter than 20 characters'],
    },
    email: {
      type: String,
      required: [true, 'A user must have a an email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
      //   validate: {
      //     validator: function () {
      //       return this.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{1,4}$/);
      //     },
      //   },
      //validate
    },
    photo: {
      type: String,
    },
    password: {
      type: String,
      required: [true, 'A user must have a password'],
      validate: {
        validator: function () {
          return this.password.match(
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
          );
        },
      },
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'A user must have a password'],
      unique: true,
      validate: {
        validator: function () {
          return this.password === this.passwordConfirm;
        },
        message: 'The passwords do not match',
      },
    },
  },
  //   {
  //     toJSON: { virtuals: true },
  //     toObject: { virtuals: true },
  //   },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  return next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
