const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

const results = [];

// To delete one document
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

// To update one document
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

// To create one document
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

// To get one document
exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

// To get all document
exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on data (hack)
    let filter = {};
    // FILTER, SORT, FIEDS AND FILTERDATE IS DONE USING THE FOLLOWING BELOW CLASS
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .filterDate();
    const doc = await features.query;
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });

// To read the dataset which is dored in DataSet Folderin the root
fs.createReadStream(path.join(__dirname, '../DataSet/test_dataset_all.csv'))
  .pipe(csv({}))
  .on('data', (data) => results.push(data))
  .on('end', () => {});

// To push data in mongoDB
exports.createData = (Model) =>
  catchAsync(async (req, res, next) => {
    for (var i in results) {
      for (var k in results[i]) {
        if (k == 't') {
          const dateSet = results[i].t;
          if (dateSet === '') {
            results[i][k] = '';
            await Model.create(results[i]);
          } else {
            const splitDate = dateSet.split('/', 3);
            const currentYear = new Date().getFullYear().toString().substr(-2);
            if (splitDate[0] <= currentYear) {
              results[i][k] = moment(
                new Date(20 + dateSet),
                'YYYY-MM-DD, HH:MM:SS'
              )
                .utc()
                .format();

              await Model.create(results[i]);
              // console.log(results[i]);
            } else {
              results[i][k] = moment(
                new Date(19 + dateSet),
                'YYYY-MM-DD, HH:MM:SS'
              )
                .utc()
                .format();

              await Model.create(results[i]);
              // console.log(results[i]);
            }
          }
        }
      }
    }

    console.log(`documents were inserted`);

    res.status(201).json({
      status: 'success',
    });
  });
