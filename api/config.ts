const env = process.env.NODE_ENV || 'dev';
const dev = {
  connections: {
    mongo: {
      host: 'mongodb://127.0.0.1:27017/',
      database: 'iot-fablab-dev'
    }
  },
  baseUrlBackend: 'http://localhost:3000/api/v1/',
  baseUrlFrontend: 'http://localhost:4200',
  cors: {
    whitelist: ['http://localhost:4200'],
    corsOptions: {
      origin: undefined,
      credentials: true
    }
  }
};

const prod = {
  connections: {
    mongo: {
      host: 'mongodb://127.0.0.1:27017/',
      database: 'iot-fablab-staging'
    }
  },
  baseUrlBackend: 'http://localhost:3000/api/v1/',
  baseUrlFrontend: 'http://localhost:80',
  cors: {
    whitelist: ['http://localhost:80'],
    corsOptions: {
      origin: undefined,
      credentials: true
    }
  }
};

const test = {
  connections: {
    mongo: {
      host: 'mongodb://mongo:27017/',
      database: 'iot-fablab'
    }
  },
  baseUrlBackend: 'http://localhost:3000/api/v1/',
  baseUrlFrontend: 'http://localhost:80',
  cors: {
    whitelist: ['http://localhost:80'],
    corsOptions: {
      origin: undefined,
      credentials: true
    }
  }
};

const testNoCors = {
  connections: {
    mongo: {
      host: 'mongodb://127.0.0.1:27017/',
      database: 'iot-fablab-dev'
    }
  },
  baseUrlBackend: 'http://localhost:3000/api/v1/',
  baseUrlFrontend: 'http://localhost:4200',
  cors: undefined
};

export const configArr = { dev, prod, test, testNoCors };

const config = configArr[env];

export default config;
