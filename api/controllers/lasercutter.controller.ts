<<<<<<< HEAD
import machineService from '../services/machine.service';
import { LaserType } from '../models/lasertype.model';
import validatorService from '../services/validator.service';
import logger from '../logger';
=======
import validatorService from '../services/validator.service';
import logger from '../logger';
import LasercutterService from '../services/lasercutter.service';
>>>>>>> master

const lasercutterService = new LasercutterService();

/**
 * @api {get} /api/v1/machines/lasercutters Get lasercutters
 * @apiName GetLasercutters
 * @apiVersion 1.0.0
 * @apiGroup Lasercutters
 * @apiHeader (Needed Request Headers) {String} Content-Type application/json
 *
 * @apiParam (Query String) limit is the limit of objects to get
 * @apiParam (Query String) skip is the number of objects to skip
 * @apiSuccess {Array} lasercutters an array of lasercutter objects
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
{
    "lasercutters": [
        {
            "_id": "5b51c25c1058dc2189272724",
            "fablabId": 2,
            "type": "lasercutter",
            "deviceName": "Helix",
            "manufacturer": "Epilog",
            "laserTypes": [
                {
                    "_id": "5b51c25c1058dc2189272723",
                    "laserType": "CO2",
                    "id": 1
                }
            ],
            "camSoftware": "",
            "workspaceX": 600,
            "workspaceY": 450,
            "workspaceZ": 350,
            "laserPower": "40",
            "comment": "",
            "__v": 0
        },
        {
            "_id": "5b51c25c1058dc2189272728",
            "fablabId": 4,
            "type": "lasercutter",
            "deviceName": "MARS-130",
            "manufacturer": "Thunderlaser",
            "laserTypes": [
                {
                    "_id": "5b51c25c1058dc2189272727",
                    "laserType": "CO2",
                    "id": 1
                }
            ],
            "camSoftware": "RD-Works",
            "workspaceX": 1500,
            "workspaceY": 900,
            "workspaceZ": 250,
            "laserPower": "100",
            "comment": "",
            "__v": 0
        }
    ]
}
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 204 No-Content
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 206 Partial Content
{
    "lasercutters": [
        {
            "_id": "5b51c25c1058dc2189272724",
            "fablabId": 2,
            "type": "lasercutter",
            "deviceName": "Helix",
            "manufacturer": "Epilog",
            "laserTypes": [
                {
                    "_id": "5b51c25c1058dc2189272723",
                    "laserType": "CO2",
                    "id": 1
                }
            ],
            "camSoftware": "",
            "workspaceX": 600,
            "workspaceY": 450,
            "workspaceZ": 350,
            "laserPower": "40",
            "comment": "",
            "__v": 0
        },
        {
            "_id": "5b51c25c1058dc2189272728",
            "fablabId": 4,
            "type": "lasercutter",
            "deviceName": "MARS-130",
            "manufacturer": "Thunderlaser",
            "laserTypes": [
                {
                    "_id": "5b51c25c1058dc2189272727",
                    "laserType": "CO2",
                    "id": 1
                }
            ],
            "camSoftware": "RD-Works",
            "workspaceX": 1500,
            "workspaceY": 900,
            "workspaceZ": 250,
            "laserPower": "100",
            "comment": "",
            "__v": 0
        }
    ]
}
 */
function getAll (req, res) {
  req.query = validatorService.checkQuery(req.query);
<<<<<<< HEAD
  _getAll(req.query.limit, req.query.skip).then((lasercutters) => {
=======
  lasercutterService.getAll(req.query.limit, req.query.skip).then((lasercutters) => {
>>>>>>> master
    if ((lasercutters && lasercutters.length === 0) || !lasercutters) {
      logger.info('GET Lasercutters with no result');
      res.status(204).send();
    } else if (lasercutters && req.query.limit && req.query.skip) {
      logger.info(`GET Lasercutters with partial result ${JSON.stringify(lasercutters)}`);
      res.status(206).send({ lasercutters });
    } else if (lasercutters) {
      logger.info(`GET Lasercutters with result ${JSON.stringify(lasercutters)}`);
      res.status(200).send({ lasercutters });
    }
  }).catch((err) => {
    logger.error(err);
    res.status(500).send(err);
  });
}

/**
 * @api {get} /api/v1/machines/lasercutters/count Counts the Lasercutters
 * @apiName CountLasercutter
 * @apiVersion 1.0.0
 * @apiGroup Lasercutters
 * @apiHeader (Needed Request Headers) {String} Content-Type application/json
 *
 * @apiSuccess {Object} count the number of lasercutters
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *
{
    "count": 98
}
 *
 */
function count (req, res) {
<<<<<<< HEAD
  _count().then((count) => {
=======
  lasercutterService.count().then((count) => {
>>>>>>> master
    logger.info(`Count Lasercutters with result ${JSON.stringify(count)}`);
    res.status(200).send({ count });
  }).catch((err) => {
    logger.error(err);
    res.status(500).send(err);
  });
}

/**
 * @api {get} /api/v1/machines/lasercutters/laserTypes Get Lasertypes of Lasercutters
 * @apiName GetLaserTypes
 * @apiVersion 1.0.0
 * @apiGroup Lasercutters
 * @apiHeader (Needed Request Headers) {String} Content-Type application/json
 *
 *
 * @apiSuccess {Object} lasercutter the lasercutter object
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
{
    "laserTypes": [
        {
            "_id": "5b55f7bf3fe0c8b01713b3dc",
            "laserType": "CO2",
            "__v": 0
        }
    ]
<<<<<<< HEAD
}

 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 204 No-Content
 *
 *
 */
function getLaserTypes (req, res) {
  _getLaserTypes().then((laserTypes) => {
    if (laserTypes && laserTypes.length === 0) {
      logger.info('GET Lasertypes with no result');
      res.status(204).send();
    } else if (laserTypes) {
      logger.info(`GET Lasertypes with result ${JSON.stringify(laserTypes)}`);
      res.status(200).send({ laserTypes });
    }
  }).catch((err) => {
    logger.error(err);
    res.status(500).send(err);
  });
}

/**
 * @api {post} /api/v1/machines/lasercutters/ Create new Lasercutter
 * @apiName CreateNewLasercutter
 * @apiVersion 1.0.0
 * @apiGroup Lasercutters
 * @apiHeader (Needed Request Headers) {String} Content-Type application/json
 *
 * @apiParam {String} fablabId id of the corresponding fablab (required)
 * @apiParam {String} deviceName name of the device (required)
 * @apiParam {String} manufacturer name of the manufacturer of the device
 * @apiParam {Array} laserTypes array of laserType objects
 * @apiParam {Number} workspaceX space of axis x
 * @apiParam {Number} workspaceY space volume of axis y
 * @apiParam {Number} workspaceY space volume of axis z
 * @apiParam {Number} maxResoultion resolution of lasercutter
 * @apiParam {String} laserPower power of the laser
 * @apiParam {String} comment a comment about the device
 * @apiParamExample {json} Request-Example:
 *
{
  "fablabId": "5b453ddb5cf4a9574849e98a",
  "deviceName":"Test Lasercutter" ,
  "manufacturer": "Test Manufacturer" ,
  "laserTypes": [{
    "laserType": "CO2"
  }],
  "workspaceX": 2,
  "workspaceY": 2,
  "workspaceZ": 2,
  "maxResoultion": 2,
  "laserPower": "High",
  "comment": "Create Test"
}
 *
 * @apiSuccess {Object} lasercutter the lasercutter object
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
{
    "lasercutter": {
        "_id": "5b571e4dfeb1a9647183fcd8",
        "fablabId": "5b453ddb5cf4a9574849e98a",
        "deviceName": "Test Lasercutter",
        "manufacturer": "Test Manufacturer",
        "laserTypes": [
            {
                "laserType": "CO2"
            }
        ],
        "workspaceX": 2,
        "workspaceY": 2,
        "workspaceZ": 2,
        "maxResoultion": 2,
        "laserPower": "High",
        "comment": "Create Test",
        "type": "lasercutter",
        "__v": 0
    }
}
 * @apiError 400 The request is malformed
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Malformed Request
{
    "err": "Malformed request!",
    "stack": {
        "errors": {
            "fablabId": {
                "message": "Path `fablabId` is required.",
                "name": "ValidatorError",
                "properties": {
                    "message": "Path `fablabId` is required.",
                    "type": "required",
                    "path": "fablabId",
                    "value": ""
                },
                "kind": "required",
                "path": "fablabId",
                "value": "",
                "$isValidatorError": true
            }
        },
        "_message": "Lasercutter validation failed",
        "message": "Lasercutter validation failed: fablabId: Path `fablabId` is required.",
        "name": "ValidationError"
    }
}
 *
 *
 */
function create (req, res) {
  _create(req.body).then((lasercutter) => {
    logger.info(`POST Lasercutter with result ${JSON.stringify(lasercutter)}`);
    res.status(201).send({ lasercutter });
  }).catch((err) => {
    const msg = { error: 'Malformed request!', stack: err };
    logger.error(msg);
    res.status(400).send(msg);
  });
}

/**
 * @api {delete} /api/v1/machines/lasercutters/:id Deletes a Lasercutter by a given id
 * @apiName DeleteLasercutterById
 * @apiVersion 1.0.0
 * @apiGroup Lasercutters
 * @apiHeader (Needed Request Headers) {String} Content-Type application/json
 *
 * @apiParam {id} is the id of the lasercutter
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 Ok
 * {
    "_id": "5b695b6ff371a21d0c858f2a",
    "fablabId": "5b453ddb5cf4a9574849e98a",
    "deviceName": "Test Lasercutter",
    "manufacturer": "Test Manufacturer",
    "activated": false,,
    "laserTypes": [
        {
            "_id": "5b695b6ff371a21d0c858f2b",
            "laserType": "CO2"
        }
    ],
    "workspaceX": 2,
    "workspaceY": 2,
    "workspaceZ": 2,
    "maxResoultion": 2,
    "laserPower": "High",
    "comment": "Create Test",
    "type": "lasercutter",
    "__v": 0
}
 *
 * @apiError 400 The request is malformed
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Malformed Request
{
    "error": "Id needs to be a 24 character long hex string!"
}

 * @apiError 400 The request is malformed
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Malformed Request
{
    "error": "Malformed request!"
}

 * @apiError 404 Lasercutter not found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
{
    "error: `Lasercutter by id 9999 not found!`"
}
 *
 * @apiError 500 Server Error
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Server Error
{
    "error": "Error while trying to get the Lasercutter by id 9999",
}

 * @apiError 500 Server Error
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Server Error
{
   "error": "Error while trying to delete the Lasercutter with id 9999"
}
 *
 *
 */
function deleteById (req, res) {
  const checkId = validatorService.checkId(req.params.id);
  if (checkId) {
    logger.error({ error: checkId.error });
    res.status(checkId.status).send({ error: checkId.error });
  } else {
    _get(req.params.id).then((l) => {
      if (l) {
        _deleteById(req.params.id).then((result) => {
          if (result) {
            _get(req.params.id).then((result) => {
              if (result) {
                logger.info(`DELETE Lasercutter with result ${JSON.stringify(result)}`);
                res.status(200).send({ lasercutter: result });
              }
            }).catch((err) => {
              const msg = {
                err: `Error while trying to get the Lasercutter by id ${req.params.id}`,
                stack: err
              };
              logger.error(msg);
              res.status(500).send(msg);
            });
          } else {
            const msg = { error: `Error while trying to delete the Lasercutter with id ${req.params.id}` };
            logger.error(msg);
            res.status(500).send(msg);
          }
        }).catch((err) => {
          const msg = { error: 'Malformed request!', stack: err };
          logger.error(msg);
          res.status(400).send(msg);
        });
      } else {
        const msg = { error: `Lasercutter by id ${req.params.id} not found!` };
        logger.error(msg);
        res.status(404).send(msg);
      }
    }).catch((err) => {
      const msg = { error: `Error while trying to get the Lasercutter by id ${req.params.id}`, stack: err };
      logger.error(msg);
      res.status(500).send(msg);
    });
  }
}

/**
 * @api {get} /api/v1/machines/lasercutters/:id Gets a Lasercutter by a given id
 * @apiName GetLasercutterById
 * @apiVersion 1.0.0
 * @apiGroup Lasercutters
 * @apiHeader (Needed Request Headers) {String} Content-Type application/json
 *
 * @apiParam id is the id of the lasercutter
 *
 * @apiSuccess {Object} lasercutter the lasercutter object
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
{
    "lasercutter": {
        "_id": "5b62b46ea519361b031d51b8",
        "fablabId": "5b453ddb5cf4a9574849e98a",
        "deviceName": "Test Lasercutter",
        "manufacturer": "Test Manufacturer",
        "laserTypes": [
            {
                "_id": "5b62b46ea519361b031d51b9",
                "laserType": "CO2"
            }
        ],
        "workspaceX": 2,
        "workspaceY": 2,
        "workspaceZ": 2,
        "maxResoultion": 2,
        "laserPower": "High",
        "comment": "Create Test",
        "type": "lasercutter",
        "__v": 0
    }
}
 * @apiError 400 The request is malformed
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Malformed Request
{
    "error": "Id needs to be a 24 character long hex string!"
}
 * @apiError 404 The object was not found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Lasercutter by id '9999' not found"
 *     }
 *
 *
 */
function get (req, res) {
  const checkId = validatorService.checkId(req.params.id);
  if (checkId) {
    logger.error({ error: checkId.error });
    res.status(checkId.status).send({ error: checkId.error });
  } else {
    _get(req.params.id).then((lasercutter) => {
      if (!lasercutter) {
        const msg = { error: `Lasercutter by id '${req.params.id}' not found` };
        logger.error(msg);
        res.status(404).send(msg);
      } else {
        logger.info(`GET LasercutterById with result ${JSON.stringify(lasercutter)}`);
        res.status(200).send({ lasercutter });
      }
    }).catch((err) => {
      const msg = { error: 'Malformed request!', stack: err };
      logger.error(msg);
      res.status(400).send(msg);
    });
  }
}

/**
 * @api {put} /api/v1/machines/lasercutters/:id Updates a Lasercutter by a given id
 * @apiName UpdateLasercutterByID
 * @apiVersion 1.0.0
 * @apiGroup Lasercutters
 * @apiHeader (Needed Request Headers) {String} Content-Type application/json
 *
 * @apiParam {id} is the id of the lasercutter
 * @apiParam {String} fablabId id of the corresponding fablab (required)
 * @apiParam {String} deviceName name of the device (required)
 * @apiParam {String} manufacturer name of the manufacturer of the device
 * @apiParam {Array} laserTypes array of laserType objects
 * @apiParam {Number} workspaceX space of axis x
 * @apiParam {Number} workspaceY space volume of axis y
 * @apiParam {Number} workspaceY space volume of axis z
 * @apiParam {Number} maxResoultion resolution of lasercutter
 * @apiParam {String} laserPower power of the laser
 * @apiParam {String} comment a comment about the device
 *
 * @apiParamExample {json} Request-Example:
 *
{
    "_id" : "5b66c55aab1b741fbbc2fd3c",
    "fablabId" : "5b453ddb5cf4a9574849e98a",
    "deviceName" : "Updated",
    "manufacturer" : "Test Manufacturer",
    "laserTypes" : [
        {
            "_id" : "5b66c55aab1b741fbbc2fd3d",
            "laserType" : "CO2"
        }
    ],
    "workspaceX" : 2,
    "workspaceY" : 2,
    "workspaceZ" : 2,
    "maxResoultion" : 2,
    "laserPower" : "High",
    "comment" : "Create Test",
    "type" : "lasercutter",
    "__v" : 0
}
 * @apiSuccess {Object} lasercutter the lasercutter object
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
{
    "lasercutter": {
        "_id": "5b66c55aab1b741fbbc2fd3c",
        "fablabId": "5b453ddb5cf4a9574849e98a",
        "deviceName": "Updated",
        "manufacturer": "Test Manufacturer",
        "laserTypes": [
            {
                "_id": "5b66c55aab1b741fbbc2fd3d",
                "laserType": "CO2"
            }
        ],
        "workspaceX": 2,
        "workspaceY": 2,
        "workspaceZ": 2,
        "maxResoultion": 2,
        "laserPower": "High",
        "comment": "Create Test",
        "type": "lasercutter",
        "__v": 0
    }
}
 * @apiError 400 The request is malformed
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Malformed Request
{
    "error": "Id needs to be a 24 character long hex string!"
}
 * @apiError 400 The request is malformed
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Malformed Request
{
    "error": "No params to update given!"
}
 * @apiError 404 The object was not found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Lasercutter by id '9999' not found"
 *     }
 *
 *
 */
function update (req, res) {
  const checkId = validatorService.checkId(req.params.id);
  if (checkId) {
    logger.error({ error: checkId.error });
    res.status(checkId.status).send({ error: checkId.error });
  } else if (Object.keys(req.body).length === 0) {
    const msg = { error: 'No params to update given!' };
    logger.error(msg);
    res.status(400).send(msg);
  } else {
    _get(req.params.id).then((lasercutter) => {
      if (!lasercutter) {
        const msg = { error: `Lasercutter by id '${req.params.id}' not found` };
        logger.error(msg);
        res.status(404).send(msg);
      } else {
        _update(req.params.id, req.body).then((lasercutter) => {
          logger.info(`PUT Lasercutter with result ${JSON.stringify(lasercutter)}`);
          res.status(200).send({ lasercutter });
        });
      }
    }).catch((err) => {
      const msg = { error: 'Malformed request!', stack: err };
      logger.error(msg);
      res.status(400).send(msg);
    });
  }
}

function _getAll (limit?: string, skip?: string) {
  let l: Number;
  let s: Number;
  if (limit && skip) {
    l = Number.parseInt(limit, 10);
    s = Number.parseInt(skip, 10);
  }
  return machineService.getMachineType(machineType, l, s);
}

function _create (params) {
  return machineService.create(machineType, params);
}

function _getLaserTypes () {
  return LaserType.find();
}

function _get (id) {
  return machineService.get(machineType, id);
}

function _deleteById (id) {
  return machineService.deleteById(machineType, id);
}

function _update (id, machine) {
  return machineService.update(machineType, id, machine);
}

function _count () {
  return machineService.count(machineType);
=======
}

 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 204 No-Content
 *
 *
 */
function getLaserTypes (req, res) {
  lasercutterService.getLaserTypes().then((laserTypes) => {
    if (laserTypes && laserTypes.length === 0) {
      logger.info('GET Lasertypes with no result');
      res.status(204).send();
    } else if (laserTypes) {
      logger.info(`GET Lasertypes with result ${JSON.stringify(laserTypes)}`);
      res.status(200).send({ laserTypes });
    }
  }).catch((err) => {
    logger.error(err);
    res.status(500).send(err);
  });
}

/**
 * @api {post} /api/v1/machines/lasercutters/ Create new Lasercutter
 * @apiName CreateNewLasercutter
 * @apiVersion 1.0.0
 * @apiGroup Lasercutters
 * @apiHeader (Needed Request Headers) {String} Content-Type application/json
 *
 * @apiParam {String} fablabId id of the corresponding fablab (required)
 * @apiParam {String} deviceName name of the device (required)
 * @apiParam {String} manufacturer name of the manufacturer of the device
 * @apiParam {Array} laserTypes array of laserType objects
 * @apiParam {Number} workspaceX space of axis x
 * @apiParam {Number} workspaceY space volume of axis y
 * @apiParam {Number} workspaceY space volume of axis z
 * @apiParam {Number} maxResoultion resolution of lasercutter
 * @apiParam {String} laserPower power of the laser
 * @apiParam {String} comment a comment about the device
 * @apiParamExample {json} Request-Example:
 *
{
  "fablabId": "5b453ddb5cf4a9574849e98a",
  "deviceName":"Test Lasercutter" ,
  "manufacturer": "Test Manufacturer" ,
  "laserTypes": [{
    "laserType": "CO2"
  }],
  "workspaceX": 2,
  "workspaceY": 2,
  "workspaceZ": 2,
  "maxResoultion": 2,
  "laserPower": "High",
  "comment": "Create Test"
}
 *
 * @apiSuccess {Object} lasercutter the lasercutter object
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
{
    "lasercutter": {
        "_id": "5b571e4dfeb1a9647183fcd8",
        "fablabId": "5b453ddb5cf4a9574849e98a",
        "deviceName": "Test Lasercutter",
        "manufacturer": "Test Manufacturer",
        "laserTypes": [
            {
                "laserType": "CO2"
            }
        ],
        "workspaceX": 2,
        "workspaceY": 2,
        "workspaceZ": 2,
        "maxResoultion": 2,
        "laserPower": "High",
        "comment": "Create Test",
        "type": "lasercutter",
        "__v": 0
    }
}
 * @apiError 400 The request is malformed
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Malformed Request
{
    "err": "Malformed request!",
    "stack": {
        "errors": {
            "fablabId": {
                "message": "Path `fablabId` is required.",
                "name": "ValidatorError",
                "properties": {
                    "message": "Path `fablabId` is required.",
                    "type": "required",
                    "path": "fablabId",
                    "value": ""
                },
                "kind": "required",
                "path": "fablabId",
                "value": "",
                "$isValidatorError": true
            }
        },
        "_message": "Lasercutter validation failed",
        "message": "Lasercutter validation failed: fablabId: Path `fablabId` is required.",
        "name": "ValidationError"
    }
}
 *
 *
 */
function create (req, res) {
  lasercutterService.create(req.body).then((lasercutter) => {
    logger.info(`POST Lasercutter with result ${JSON.stringify(lasercutter)}`);
    res.status(201).send({ lasercutter });
  }).catch((err) => {
    const msg = { error: 'Malformed request!', stack: err };
    logger.error(msg);
    res.status(400).send(msg);
  });
}

/**
 * @api {delete} /api/v1/machines/lasercutters/:id Deletes a Lasercutter by a given id
 * @apiName DeleteLasercutterById
 * @apiVersion 1.0.0
 * @apiGroup Lasercutters
 * @apiHeader (Needed Request Headers) {String} Content-Type application/json
 *
 * @apiParam {id} is the id of the lasercutter
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 Ok
 * {
    "_id": "5b695b6ff371a21d0c858f2a",
    "fablabId": "5b453ddb5cf4a9574849e98a",
    "deviceName": "Test Lasercutter",
    "manufacturer": "Test Manufacturer",
    "activated": false,,
    "laserTypes": [
        {
            "_id": "5b695b6ff371a21d0c858f2b",
            "laserType": "CO2"
        }
    ],
    "workspaceX": 2,
    "workspaceY": 2,
    "workspaceZ": 2,
    "maxResoultion": 2,
    "laserPower": "High",
    "comment": "Create Test",
    "type": "lasercutter",
    "__v": 0
}
 *
 * @apiError 400 The request is malformed
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Malformed Request
{
    "error": "Id needs to be a 24 character long hex string!"
}

 * @apiError 400 The request is malformed
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Malformed Request
{
    "error": "Malformed request!"
}

 * @apiError 404 Lasercutter not found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
{
    "error: `Lasercutter by id 9999 not found!`"
}
 *
 * @apiError 500 Server Error
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Server Error
{
    "error": "Error while trying to get the Lasercutter by id 9999",
}

 * @apiError 500 Server Error
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Server Error
{
   "error": "Error while trying to delete the Lasercutter with id 9999"
}
 *
 *
 */
function deleteById (req, res) {
  const checkId = validatorService.checkId(req.params.id);
  if (checkId) {
    logger.error({ error: checkId.error });
    res.status(checkId.status).send({ error: checkId.error });
  } else {
    lasercutterService.get(req.params.id).then((l) => {
      if (l) {
        lasercutterService.deleteById(req.params.id).then((result) => {
          if (result) {
            lasercutterService.get(req.params.id).then((result) => {
              if (result) {
                logger.info(`DELETE Lasercutter with result ${JSON.stringify(result)}`);
                res.status(200).send({ lasercutter: result });
              }
            }).catch((err) => {
              const msg = {
                err: `Error while trying to get the Lasercutter by id ${req.params.id}`,
                stack: err
              };
              logger.error(msg);
              res.status(500).send(msg);
            });
          } else {
            const msg = { error: `Error while trying to delete the Lasercutter with id ${req.params.id}` };
            logger.error(msg);
            res.status(500).send(msg);
          }
        }).catch((err) => {
          const msg = { error: 'Malformed request!', stack: err };
          logger.error(msg);
          res.status(400).send(msg);
        });
      } else {
        const msg = { error: `Lasercutter by id ${req.params.id} not found!` };
        logger.error(msg);
        res.status(404).send(msg);
      }
    }).catch((err) => {
      const msg = { error: `Error while trying to get the Lasercutter by id ${req.params.id}`, stack: err };
      logger.error(msg);
      res.status(500).send(msg);
    });
  }
}

/**
 * @api {get} /api/v1/machines/lasercutters/:id Gets a Lasercutter by a given id
 * @apiName GetLasercutterById
 * @apiVersion 1.0.0
 * @apiGroup Lasercutters
 * @apiHeader (Needed Request Headers) {String} Content-Type application/json
 *
 * @apiParam id is the id of the lasercutter
 *
 * @apiSuccess {Object} lasercutter the lasercutter object
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
{
    "lasercutter": {
        "_id": "5b62b46ea519361b031d51b8",
        "fablabId": "5b453ddb5cf4a9574849e98a",
        "deviceName": "Test Lasercutter",
        "manufacturer": "Test Manufacturer",
        "laserTypes": [
            {
                "_id": "5b62b46ea519361b031d51b9",
                "laserType": "CO2"
            }
        ],
        "workspaceX": 2,
        "workspaceY": 2,
        "workspaceZ": 2,
        "maxResoultion": 2,
        "laserPower": "High",
        "comment": "Create Test",
        "type": "lasercutter",
        "__v": 0
    }
}
 * @apiError 400 The request is malformed
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Malformed Request
{
    "error": "Id needs to be a 24 character long hex string!"
}
 * @apiError 404 The object was not found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Lasercutter by id '9999' not found"
 *     }
 *
 *
 */
function get (req, res) {
  const checkId = validatorService.checkId(req.params.id);
  if (checkId) {
    logger.error({ error: checkId.error });
    res.status(checkId.status).send({ error: checkId.error });
  } else {
    lasercutterService.get(req.params.id).then((lasercutter) => {
      if (!lasercutter) {
        const msg = { error: `Lasercutter by id '${req.params.id}' not found` };
        logger.error(msg);
        res.status(404).send(msg);
      } else {
        logger.info(`GET LasercutterById with result ${JSON.stringify(lasercutter)}`);
        res.status(200).send({ lasercutter });
      }
    }).catch((err) => {
      const msg = { error: 'Malformed request!', stack: err };
      logger.error(msg);
      res.status(400).send(msg);
    });
  }
}

/**
 * @api {put} /api/v1/machines/lasercutters/:id Updates a Lasercutter by a given id
 * @apiName UpdateLasercutterByID
 * @apiVersion 1.0.0
 * @apiGroup Lasercutters
 * @apiHeader (Needed Request Headers) {String} Content-Type application/json
 *
 * @apiParam {id} is the id of the lasercutter
 * @apiParam {String} fablabId id of the corresponding fablab (required)
 * @apiParam {String} deviceName name of the device (required)
 * @apiParam {String} manufacturer name of the manufacturer of the device
 * @apiParam {Array} laserTypes array of laserType objects
 * @apiParam {Number} workspaceX space of axis x
 * @apiParam {Number} workspaceY space volume of axis y
 * @apiParam {Number} workspaceY space volume of axis z
 * @apiParam {Number} maxResoultion resolution of lasercutter
 * @apiParam {String} laserPower power of the laser
 * @apiParam {String} comment a comment about the device
 *
 * @apiParamExample {json} Request-Example:
 *
{
    "_id" : "5b66c55aab1b741fbbc2fd3c",
    "fablabId" : "5b453ddb5cf4a9574849e98a",
    "deviceName" : "Updated",
    "manufacturer" : "Test Manufacturer",
    "laserTypes" : [
        {
            "_id" : "5b66c55aab1b741fbbc2fd3d",
            "laserType" : "CO2"
        }
    ],
    "workspaceX" : 2,
    "workspaceY" : 2,
    "workspaceZ" : 2,
    "maxResoultion" : 2,
    "laserPower" : "High",
    "comment" : "Create Test",
    "type" : "lasercutter",
    "__v" : 0
}
 * @apiSuccess {Object} lasercutter the lasercutter object
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
{
    "lasercutter": {
        "_id": "5b66c55aab1b741fbbc2fd3c",
        "fablabId": "5b453ddb5cf4a9574849e98a",
        "deviceName": "Updated",
        "manufacturer": "Test Manufacturer",
        "laserTypes": [
            {
                "_id": "5b66c55aab1b741fbbc2fd3d",
                "laserType": "CO2"
            }
        ],
        "workspaceX": 2,
        "workspaceY": 2,
        "workspaceZ": 2,
        "maxResoultion": 2,
        "laserPower": "High",
        "comment": "Create Test",
        "type": "lasercutter",
        "__v": 0
    }
}
 * @apiError 400 The request is malformed
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Malformed Request
{
    "error": "Id needs to be a 24 character long hex string!"
}
 * @apiError 400 The request is malformed
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Malformed Request
{
    "error": "No params to update given!"
}
 * @apiError 404 The object was not found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Lasercutter by id '9999' not found"
 *     }
 *
 *
 */
function update (req, res) {
  const checkId = validatorService.checkId(req.params.id);
  if (checkId) {
    logger.error({ error: checkId.error });
    res.status(checkId.status).send({ error: checkId.error });
  } else if (Object.keys(req.body).length === 0) {
    const msg = { error: 'No params to update given!' };
    logger.error(msg);
    res.status(400).send(msg);
  } else {
    lasercutterService.get(req.params.id).then((lasercutter) => {
      if (!lasercutter) {
        const msg = { error: `Lasercutter by id '${req.params.id}' not found` };
        logger.error(msg);
        res.status(404).send(msg);
      } else {
        lasercutterService.update(req.params.id, req.body).then((lasercutter) => {
          logger.info(`PUT Lasercutter with result ${JSON.stringify(lasercutter)}`);
          res.status(200).send({ lasercutter });
        });
      }
    }).catch((err) => {
      const msg = { error: 'Malformed request!', stack: err };
      logger.error(msg);
      res.status(400).send(msg);
    });
  }
>>>>>>> master
}

export default {
  getAll, create, getLaserTypes, deleteById, get, update, count
};
