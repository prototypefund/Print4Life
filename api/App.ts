import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

import routes from './routes/index.route';
import config from './config/config';

class App {
  public express;

  constructor () {
    this.express = express();
    this.setCorsOptions();
    this.mountRoutes();
  }

  private mountRoutes (): void {
    this.express.use(bodyParser.json());
    this.express.use(((req, res, next) => {
      if (req.get('Content-Type') === 'application/json') {
        next();
      } else {
        res.status(400).send({ err: 'Only content-type \'application/json\' is accepted!' });
      }
    }));
    this.express.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });
    this.express.use('/api/v1/', routes);
    this.express.get('*', (req, res) => {
      res.redirect(`${config.baseUrlFrontend}`);
    });
  }

  private setCorsOptions (): void {
    if (config.cors) {
      config.cors.corsOptions.origin = function (origin, callback) {
        if (config.cors.whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      };
      this.express.use(cors(config.cors.corsOptions));
    } else {
      this.express.use(cors());
    }
  }
}

export default new App().express;
