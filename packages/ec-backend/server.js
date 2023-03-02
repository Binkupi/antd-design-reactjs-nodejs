const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const { HOST, PORT } = require('./configs/server');
const db = require('./api/models');
const logger = require('./utils/logger');
const bootstrap = require('./configs/functions/bootstrap');
const authentication = require('./api/middleware/authentication');
const permission = require('./api/middleware/permission');

app.use(morgan('dev'));
app.use(cors({
  origin: '*'
}));


// Configure body parser
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

// Set public folder path
app.use(express.static(path.join(__dirname, 'public')));

// Configure and connect to database
db.mongoose
  .connect(db.url, {
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info('Connect to database successfully!!!');
    return bootstrap();
  })
  .then(() => {
    logger.info('Create default role and update permissions successfully!!!');
  })
  .catch((error) => {
    logger.error('Connect to database failed!!!');
    logger.error(error);
    process.exit(0);
  });

app.use(authentication);
app.use(permission);
// Configure routing
require('./api/routers')(app);

// Configure listening
app.listen(PORT, () => {
  logger.info(`Server starts listening on http://${HOST}:${PORT}`);
});
