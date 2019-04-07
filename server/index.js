
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import routerV1 from './routes/v1';
import DatabaseInstance from './databaseSetup';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(helmet());

// initiallize the mongo database
// eslint-disable-next-line no-unused-vars
const instance = new DatabaseInstance();

// load all routes
routerV1(app);

app.use('/', (req, res) => {
  res.send({
    message: 'Population system API by Gabriel Micah - Software developer',
  });
});

const server = app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`);
});

// If the database is not active we close it.
process.on('unhandledRejection', (err) => {
  if (err) console.error(err);
  server.close();
  process.exit(1);
});

export default app;
