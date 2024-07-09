const mongoose = require('mongoose');

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
      validate: {
        validator: function () {
          return this.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{1,4}$/);
        },
      },
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
    },
    passwordConfirm: {
      type: String,
      required: [true, 'A user must have a password'],
      unique: true,
      validate: {
        validator: function () {
          return this.password === this.passwordConfirm;
        },
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
