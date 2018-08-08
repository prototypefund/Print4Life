import 'jasmine';
import * as request from 'request';
import * as configs from '../config';

const endpoint = `${configs.configArr.prod.baseUrlBackend}machines/printers`;

const testPrinter = {
  fablabId: '5b453ddb5cf4a9574849e98a',
  deviceName: 'Test Printer',
  manufacturer: 'Test Manufacturer',
  materials: [{
    material: 'PLA',
    type: 'printerMaterial'
  }],
  camSoftware: 'Test Software',
  printVolumeX: 2,
  printVolumeY: 2,
  printVolumeZ: 2,
  printResolutionX: 2,
  printResolutionY: 2,
  printResolutionZ: 2,
  nozzleDiameter: 2,
  numberOfExtruders: 2,
  pictureURL: '',
  comment: 'Create Test'
};

describe('Printer Controller', () => {
  it('gets printers', (done) => {
    request.get(`${endpoint}`, {
      headers: { 'content-type': 'application/json' },
      json: true
    }, (error, response) => {
      const printers = response.body.printers;
      expect(response.statusCode).toEqual(200);
      expect(printers).toBeDefined();
      expect(printers.length).toBeGreaterThan(-1);
      expect(printers[0].type).toEqual('printer');
      done();
    });
  });

  it('create printer (success)', (done) => {
    request.post(`${endpoint}/create`, { body: testPrinter, json: true }, (error, response) => {
      const printer = response.body.printer;
      expect(response.statusCode).toEqual(201);
      expect(printer).toBeDefined();
      expect(printer.deviceName).toEqual(testPrinter.deviceName);
      expect(printer.type).toEqual('printer');
      expect(printer.manufacturer).toEqual(testPrinter.manufacturer);
      expect(printer.fablabId).toEqual(testPrinter.fablabId);
      done();
    });
  });

  it('create printer (missing fablabId)', (done) => {
    const testBody = JSON.parse(JSON.stringify(testPrinter));
    delete testBody.fablabId;
    request.post(`${endpoint}/create`, { body: testBody, json: true }, (error, response) => {
      expect(response.statusCode).toEqual(400);
      done();
    });
  });

  it('create printer (fablabId too short)', (done) => {
    const testBody = JSON.parse(JSON.stringify(testPrinter));
    testBody.fablabId = 'tooShortForMongoDB23';
    request.post(`${endpoint}/create`, { body: testBody, json: true }, (error, response) => {
      expect(response.statusCode).toEqual(400);
      done();
    });
  });

  it('create printer (fablabId too long)', (done) => {
    const testBody = JSON.parse(JSON.stringify(testPrinter));
    testBody.fablabId = 'tooLongForMongoDBsObjectId1234567890';
    request.post(`${endpoint}/create`, { body: testBody, json: true }, (error, response) => {
      expect(response.statusCode).toEqual(400);
      done();
    });
  });

  it('update printer (success)', (done) => {
    request.post(`${endpoint}/create`, { body: testPrinter, json: true }, (error, response) => {
      const printer = response.body.printer;
      expect(response.statusCode).toEqual(201);
      expect(printer).toBeDefined();
      expect(printer.deviceName).toEqual(testPrinter.deviceName);
      expect(printer.type).toEqual('printer');
      expect(printer.manufacturer).toEqual(testPrinter.manufacturer);
      expect(printer.fablabId).toEqual(testPrinter.fablabId);
      printer.deviceName = 'Updated';
      request.put(`${endpoint}/${printer._id}`, { body: printer, json: true }, (error, response) => {
        const updatedPrinter = response.body.printer;
        expect(response.statusCode).toEqual(200);
        expect(updatedPrinter).toBeDefined();
        expect(updatedPrinter.deviceName).toEqual(printer.deviceName);
        done();
      });
    });
  });

  it('update printer (id too short)', (done) => {
    const id = 'tooShortForMongoDB23';
    request.put(`${endpoint}/${id}`, { body: testPrinter, json: true }, (error, response) => {
      expect(response.statusCode).toEqual(400);
      done();
    });
  });

  it('update printer (id too long)', (done) => {
    const id = 'tooLongForMongoDBsObjectId1234567890';
    request.put(`${endpoint}/${id}`, { body: testPrinter, json: true }, (error, response) => {
      expect(response.statusCode).toEqual(400);
      done();
    });
  });

  it('update printer (no body)', (done) => {
    const id = '5b453ddb5cf4a9574849e98a';
    request.put(`${endpoint}/${id}`, { json: true }, (error, response) => {
      expect(response.statusCode).toEqual(400);
      done();
    });
  });

  it('delete printer (success)', (done) => {
    let responseMachine;
    request.post(`${endpoint}/create`, { body: testPrinter, json: true }, (error, response) => {
      expect(response.statusCode).toEqual(201);
      responseMachine = response.body.printer;
      request.delete(`${endpoint}/${response.body.printer._id}`, {
        headers: { 'content-type': 'application/json' },
        json: true
      }, (error, response) => {
        expect(response.statusCode).toEqual(204);
        request.get(`${endpoint}/${responseMachine._id}`, {
          headers: { 'content-type': 'application/json' },
          json: true
        }, (error, response) => {
          expect(response.statusCode).toEqual(404);
          expect(response.body.printer).toBeUndefined();
          done();
        });
      });
    });
  });

  it('delete printer (id too long)', (done) => {
    const id = 'tooLongForMongoDBsObjectId1234567890';
    request.delete(`${endpoint}/${id}`, {
      headers: { 'content-type': 'application/json' },
      json: true
    }, (error, response) => {
      expect(response.statusCode).toEqual(400);
      done();
    });
  });

  it('delete printer (id too short)', (done) => {
    const id = 'tooShort';
    request.delete(`${endpoint}/${id}`, {
      headers: { 'content-type': 'application/json' },
      json: true
    }, (error, response) => {
      expect(response.statusCode).toEqual(400);
      done();
    });
  });

  it('get printer (success)', (done) => {
    request.post(`${endpoint}/create`, { body: testPrinter, json: true }, (error, response) => {
      expect(response.statusCode).toEqual(201);
      const id = response.body.printer._id;
      request.get(`${endpoint}/${id}`, {
        headers: { 'content-type': 'application/json' },
        json: true
      }, (error, response) => {
        expect(response.statusCode).toEqual(200);
        done();
      });
    });
  });

  it('get printer (id too long)', (done) => {
    const id = 'tooLongForMongoDBsObjectId1234567890';
    request.delete(`${endpoint}/${id}`, {
      headers: { 'content-type': 'application/json' },
      json: true
    }, (error, response) => {
      expect(response.statusCode).toEqual(400);
      done();
    });
  });

  it('get printer (id too short)', (done) => {
    const id = 'tooShort';
    request.delete(`${endpoint}/${id}`, {
      headers: { 'content-type': 'application/json' },
      json: true
    }, (error, response) => {
      expect(response.statusCode).toEqual(400);
      done();
    });
  });
});