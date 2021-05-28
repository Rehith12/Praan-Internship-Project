const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

// For signup route call goes to controller/authcontroller/signup
router.post('/signup', authController.signup);
// For login route call goes to controller/authcontroller/login
router.post('/login', authController.login);
// For logout route call goes to controller/authcontroller/logout
router.get('/logout', authController.logout);

// For forgotpassword route call goes to controller/authcontroller/forgotPassword
router.post('/forgotPassword', authController.forgotPassword);
// For resetPassword route call goes to controller/authcontroller/resetPassword
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);

// For updatepassword route call goes to controller/authcontroller/updatePassword
router.patch('/updateMyPassword', authController.updatePassword);
// For get user data route call goes to controller/userController/getMe && controller/userController/getMe
router.get('/me', userController.getMe, userController.getUser);
// For updateprofile route call
router.patch('/updateMe', userController.updateMe);
// For delete current user route call
router.delete('/deleteMe', userController.deleteMe);

// Only admin role user has authentication for the below routes
router.use(authController.restrictTo('admin'));

// To get all user and to create an user
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

// Toget single user, updateUser profile and delete user profile
router
  .route('/:id') //Here id is mongoDB document id
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
