const moment = require('moment');

// FILTER, SORT, LIMIT AND DATE FILTER TAKES PLACE IN THE FOLLOWING CLASS APIFeaturesAPIFeatures
class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // To filter the data in the dataset
  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = [
      'page',
      'sort',
      'limit',
      'fields',
      'fromDate',
      'toDate',
    ];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  // To sort the data in the dataset
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  // To show limited field in the dataset
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  // To filter date in the dataset
  filterDate() {
    if (this.queryString.fromDate) {
      let utcDateFrom = '';
      let utcDateTo = '';
      const splitDateFrom = this.queryString.fromDate.split('/', 3);
      const splitDateTo = this.queryString.toDate.split('/', 3);
      const currentYear = new Date().getFullYear().toString().substr(-2);
      if (splitDateFrom[0] <= currentYear) {
        utcDateFrom = moment(
          new Date(20 + splitDateFrom),
          'YYYY-MM-DD, HH:MM:SS'
        )
          .utc()
          .format();
      } else {
        utcDateFrom = moment(
          new Date(19 + splitDateFrom),
          'YYYY-MM-DD, HH:MM:SS'
        )
          .utc()
          .format();
      }

      if (splitDateTo[0] <= currentYear) {
        utcDateTo = moment(new Date(20 + splitDateTo), 'YYYY-MM-DD, HH:MM:SS')
          .utc()
          .format();
      } else {
        utcDateTo = moment(new Date(19 + splitDateTo), 'YYYY-MM-DD, HH:MM:SS')
          .utc()
          .format();
      }
      console.log(utcDateFrom);
      console.log(utcDateTo);

      this.query = this.query.find({
        t: {
          $gte: utcDateFrom,
          $lte: utcDateTo,
        },
      });
    }

    return this;
  }
}
module.exports = APIFeatures;
