const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authenticationController');

const router = express.Router();

router.post('/signup', authController.signup);
//router.route('/signup').post(authController.signup);
// router.route('/signup').post(() => {
//   console.log('Called');
// });

router.route('/').get(userController.getAllUsers).post(userController.addUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
