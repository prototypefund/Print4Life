const env = process.env.NODE_ENV || 'dev';
const port = process.env.PORT || 3000;
const ngPort = process.env.NG_PORT || 4200;
const dev = {
  jwtSecret: 'verInsecurePW!!!111einself',
  connections: {
    mongo: {
      host: 'mongodb://127.0.0.1:27017/',
      database: 'iot-fablab-dev'
    }
  },
  baseUrlBackend: `http://localhost:${port}/api/v1/`,
  baseUrlFrontend: `http://localhost:${ngPort}`,
  cors: {
    whitelist: [`http://localhost:${ngPort}`],
    corsOptions: {
      origin: undefined,
      credentials: true
    }
  }
  // cors: undefined // if testing backend routes in dev mode without using the frontend
};

const prod = {
  jwtSecret: 'verInsecurePW!!!111einself',
  connections: {
    mongo: {
      host: 'mongodb://127.0.0.1:27017/',
      database: 'iot-fablab-staging'
    }
  },
  baseUrlBackend: `http://localhost:${port}/api/v1/`,
  baseUrlFrontend: `http://localhost:${ngPort}`,
  cors: {
    whitelist: [`http://localhost:${ngPort}`, `http://212.83.56.107:${ngPort}`, `http://iot-fablab.ddns.net:${ngPort}`],
    corsOptions: {
      origin: undefined,
      credentials: true
    }
  }
};

const test = {
  jwtSecret: 'verInsecurePW!!!111einself',
  connections: {
    mongo: {
      host: 'mongodb://mongo:27017/',
      database: 'iot-fablab'
    }
  },
  baseUrlBackend: `http://localhost:${port}/api/v1/`,
  baseUrlFrontend: `http://localhost:${ngPort}`,
  cors: undefined
};

const testLocal = {
  jwtSecret: 'verInsecurePW!!!111einself',
  connections: {
    mongo: {
      host: 'mongodb://127.0.0.1:27017/',
      database: 'iot-fablab-dev'
    }
  },
  baseUrlBackend: `http://localhost:${port}/api/v1/`,
  baseUrlFrontend: `http://localhost:${ngPort}`,
  cors: undefined
};

export const configArr = { dev, prod, test, testLocal };

const config = configArr[env];

export default config;
