const Data = require('./../models/dataModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

//  To upload data in database by using finction createData in handlerfactory and the model data is passed as parameter
exports.createDataSet = factory.createData(Data);

//   To get data from database by using finction getAll in handlerfactory and the model data is passed as parameter
exports.getAllDatas = factory.getAll(Data);
