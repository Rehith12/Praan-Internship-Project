const express = require('express');
const dataController = require('./../controllers/dataController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

// To get all datas and create data in mongoDB
router
  .route('/')
  .get(dataController.getAllDatas)
  .post(dataController.createDataSet);

module.exports = router;
