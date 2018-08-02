import 'jasmine';
import * as request from 'request';
import * as configs from '../config';

const endpoint = `${configs.configArr.prod.baseUrlBackend}machines/lasercutters`;

const testLasercutter = {
  fablabId: '5b453ddb5cf4a9574849e98a',
  deviceName: 'Test Lasercutter',
  manufacturer: 'Test Manufacturer',
  laserTypes: [{
    laserType: 'CO2'
  }],
  workspaceX: 2,
  workspaceY: 2,
  workspaceZ: 2,
  maxResoultion: 2,
  laserPower: 'High',
  pictureURL: '',
  comment: 'Create Test'
};

describe('Lasercutter Controller', () => {
  it('gets lasercutters', (done) => {
    request.get(`${endpoint}`, (error, response) => {
      const lasercutters = JSON.parse(response.body).lasercutters;
      expect(response.statusCode).toEqual(200);
      expect(lasercutters).toBeDefined();
      expect(lasercutters.length).toBeGreaterThan(-1);
      expect(lasercutters[0].type).toEqual('lasercutter');
      done();
    });
  });

  it('gets lasertypes', (done) => {
    request.get(`${endpoint}/laserTypes`, (error, response) => {
      const laserTypes = JSON.parse(response.body).laserTypes;
      expect(response.statusCode).toEqual(200);
      expect(laserTypes).toBeDefined();
      expect(laserTypes.length).toBeGreaterThan(-1);
      done();
    });
  });

  it('create lasercutter (success)', (done) => {
    request.post(`${endpoint}/create`,
      { body: testLasercutter, json: true }, (error, response) => {
        const lasercutter = response.body.lasercutter;
        expect(response.statusCode).toEqual(201);
        expect(lasercutter).toBeDefined();
        expect(lasercutter.deviceName).toEqual(testLasercutter.deviceName);
        expect(lasercutter.type).toEqual('lasercutter');
        expect(lasercutter.manufacturer).toEqual(testLasercutter.manufacturer);
        expect(lasercutter.fablabId).toEqual(testLasercutter.fablabId);
        done();
      });
  });

  it('create lasercutter (missing fablabId)', (done) => {
    const testBody = JSON.parse(JSON.stringify(testLasercutter));
    delete testBody.fablabId;
    request.post(`${endpoint}/create`, { body: testBody, json: true }, (error, response) => {
      expect(response.statusCode).toEqual(400);
      done();
    });
  });

  it('create lasercutter (fablabId too short)', (done) => {
    const testBody = JSON.parse(JSON.stringify(testLasercutter));
    testBody.fablabId = 'tooShortForMongoDB23';
    request.post(`${endpoint}/create`, { body: testBody, json: true }, (error, response) => {
      expect(response.statusCode).toEqual(400);
      done();
    });
  });

  it('create lasercutter (fablabId too long)', (done) => {
    const testBody = JSON.parse(JSON.stringify(testLasercutter));
    testBody.fablabId = 'tooLongForMongoDBsObjectId1234567890';
    request.post(`${endpoint}/create`, { body: testBody, json: true }, (error, response) => {
      expect(response.statusCode).toEqual(400);
      done();
    });
  });

  it('delete lasercutter (success)', (done) => {
    let responseMachine;
    request.post(`${endpoint}/create`, { body: testLasercutter, json: true }, (error, response) => {
      expect(response.statusCode).toEqual(201);
      responseMachine = response.body.lasercutter;
      request.delete(`${endpoint}/${response.body.lasercutter._id}`, (error, response) => {
        expect(response.statusCode).toEqual(204);
        request.get(`${endpoint}/${responseMachine._id}`, (error, response) => {
          expect(response.statusCode).toEqual(404);
          expect(response.body.printer).toBeUndefined();
          done();
        });
      });
    });
  });

  it('delete lasercutter (id too long)', (done) => {
    const id = 'tooLongForMongoDBsObjectId1234567890';
    request.delete(`${endpoint}/${id}`, (error, response) => {
      expect(response.statusCode).toEqual(400);
      done();
    });
  });

  it('delete lasercutter (id too short)', (done) => {
    const id = 'tooShort';
    request.delete(`${endpoint}/${id}`, (error, response) => {
      expect(response.statusCode).toEqual(400);
      done();
    });
  });

  it('get lasercutter (success)', (done) => {
    request.post(`${endpoint}/create`, { body: testLasercutter, json: true }, (error, response) => {
      expect(response.statusCode).toEqual(201);
      const id = response.body.lasercutter._id;
      request.get(`${endpoint}/${id}`, (error, response) => {
        expect(response.statusCode).toEqual(200);
        done();
      });
    });
  });

  it('get lasercutter (id too long)', (done) => {
    const id = 'tooLongForMongoDBsObjectId1234567890';
    request.delete(`${endpoint}/${id}`, (error, response) => {
      expect(response.statusCode).toEqual(400);
      done();
    });
  });

  it('get lasercutter (id too short)', (done) => {
    const id = 'tooShort';
    request.delete(`${endpoint}/${id}`, (error, response) => {
      expect(response.statusCode).toEqual(400);
      done();
    });
  });
});
