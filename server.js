const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
// config file
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE_LOCAL;

// Database connection
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

// PORT NUMBER
const port = process.env.PORT || 3000;
// CREATE THE SERVER
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
