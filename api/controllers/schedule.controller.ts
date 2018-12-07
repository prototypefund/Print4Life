import validatorService from '../services/validator.service';
import logger from '../logger';
import ScheduleService from '../services/schedule.service';
import MachineService from '../services/machine.service';

const scheduleService = new ScheduleService();
const machineService = new MachineService();

/**
 * @api {get} /api/v1/schedules/:id Request a schedule by its id
 * @apiName getScheduleById
 * @apiVersion 1.0.0
 * @apiGroup Schedules
 * @apiHeader (Needed Request Headers) {String} Content-Type application/json
 *
 * @apiParam {String} id is the id of the schedule (required)
 * @apiSuccess { Object } schedule a single schedule
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
{
    "schedule": {
        "machine": {
            "type": "otherMachine",
            "id": "5b55f7bf3fe0c8b01713b3f2"
        },
        "_id": "5bfd4ff1cf880870552a846c",
        "startDate": "2018-11-27T13:28:32.000Z",
        "endDate": "2018-11-27T14:28:32.000Z",
        "fablabId": "5b453ddb5cf4a9574849e98c",
        "orderId": "5bfd430d3192b357d61f6d4c",
        "__v": 0
    }
}
*
* @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
  {
      "error": "Could not find any Schedule with id 9999"
  }
* @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Server Error
  {
      "error": "Error while trying to get Schedule with id 9999"
  }
 */
function get (req, res) {
  const checkId = validatorService.checkId(req.params.id);
  if (checkId) {
    res.status(checkId.status).send({ error: checkId.error });
  } else {
    scheduleService.get(req.params.id).then((schedule) => {
      if (!schedule) {
        logger.error({ error: `Could not find any Schedule with id ${req.params.id}` });
        res.status(404).send({ error: `Could not find any Schedule with id ${req.params.id}` });
      } else {
        logger.info(`GET Schedule with result ${JSON.stringify(schedule)}`);
        res.status(200).send({ schedule });
      }
    }).catch((err) => {
      const error = `Error while trying to get Schedule with id ${req.params.id}`;
      logger.error({ error, stack: err });
      res.status(500).send({ error });
    });
  }
}

/**
 * @api {get} /api/v1/schedules/ Request the list of schedules
 * @apiName GetSchedules
 * @apiVersion 1.0.0
 * @apiGroup Schedules
 * @apiHeader (Needed Request Headers) {String} Content-Type application/json
 *
 * @apiParam (Query String) limit is the limit of objects to get
 * @apiParam (Query String) skip is the number of objects to skip
 * @apiSuccess {Array} schedules an array of schedule objects
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
{
    "schedules": [
        {
            "machine": {
                "type": "otherMachine",
                "id": "5b55f7bf3fe0c8b01713b3f2"
            },
            "_id": "5bfd468fd6b2e95e137bf484",
            "startDate": "2018-11-27T13:28:32.000Z",
            "endDate": "2018-11-27T14:28:32.000Z",
            "fablabId": "5b453ddb5cf4a9574849e98c",
            "orderId": "5bfd430d3192b357d61f6d4c",
            "__v": 0
        },
        {
            "machine": {
                "type": "otherMachine",
                "id": "5b55f7bf3fe0c8b01713b3f2"
            },
            "_id": "5bfd46add6b2e95e137bf485",
            "startDate": "2018-11-27T13:28:32.000Z",
            "endDate": "2018-11-27T14:28:32.000Z",
            "fablabId": "5b453ddb5cf4a9574849e98c",
            "orderId": "5bfd430d3192b357d61f6d4c",
            "__v": 0
        },
        {
            "machine": {
                "type": "otherMachine",
                "id": "5b55f7bf3fe0c8b01713b3f2"
            },
            "_id": "5bfd47486de674612d4a04cd",
            "startDate": "2018-11-27T13:28:32.000Z",
            "endDate": "2018-11-27T14:28:32.000Z",
            "fablabId": "5b453ddb5cf4a9574849e98c",
            "orderId": "5bfd430d3192b357d61f6d4c",
            "__v": 0
        },
        {
            "machine": {
                "type": "otherMachine",
                "id": "5b55f7bf3fe0c8b01713b3f2"
            },
            "_id": "5bfd47a46de674612d4a04ce",
            "startDate": "2018-11-27T13:28:32.000Z",
            "endDate": "2018-11-27T14:28:32.000Z",
            "fablabId": "5b453ddb5cf4a9574849e98c",
            "orderId": "5bfd430d3192b357d61f6d4c",
            "__v": 0
        },
        {
            "machine": {
                "type": "otherMachine",
                "id": "5b55f7bf3fe0c8b01713b3f2"
            },
            "_id": "5bfd4cdf18fd0c6bbd56e862",
            "startDate": "2018-11-27T13:28:32.000Z",
            "endDate": "2018-11-27T14:28:32.000Z",
            "fablabId": "5b453ddb5cf4a9574849e98c",
            "orderId": "5bfd430d3192b357d61f6d4c",
            "__v": 0
        },
        {
            "machine": {
                "type": "otherMachine",
                "id": "5b55f7bf3fe0c8b01713b3f2"
            },
            "_id": "5bfd4d0a18fd0c6bbd56e863",
            "startDate": "2018-11-27T13:28:32.000Z",
            "endDate": "2018-11-27T14:28:32.000Z",
            "fablabId": "5b453ddb5cf4a9574849e98c",
            "orderId": "5bfd430d3192b357d61f6d4c",
            "__v": 0
        },
        {
            "machine": {
                "type": "otherMachine",
                "id": "5b55f7bf3fe0c8b01713b3f2"
            },
            "_id": "5bfd4f14f14a446d68518377",
            "startDate": "2018-11-27T13:28:32.000Z",
            "endDate": "2018-11-27T14:28:32.000Z",
            "fablabId": "5b453ddb5cf4a9574849e98c",
            "orderId": "5bfd430d3192b357d61f6d4c",
            "__v": 0
        },
        {
            "machine": {
                "type": "otherMachine",
                "id": "5b55f7bf3fe0c8b01713b3f2"
            },
            "_id": "5bfd4fd6cf880870552a846b",
            "startDate": "2018-11-27T13:28:32.000Z",
            "endDate": "2018-11-27T14:28:32.000Z",
            "fablabId": "5b453ddb5cf4a9574849e98c",
            "orderId": "5bfd430d3192b357d61f6d4c",
            "__v": 0
        },
        {
            "machine": {
                "type": "otherMachine",
                "id": "5b55f7bf3fe0c8b01713b3f2"
            },
            "_id": "5bfd4ff1cf880870552a846c",
            "startDate": "2018-11-27T13:28:32.000Z",
            "endDate": "2018-11-27T14:28:32.000Z",
            "fablabId": "5b453ddb5cf4a9574849e98c",
            "orderId": "5bfd430d3192b357d61f6d4c",
            "__v": 0
        }
    ]
}
* @apiSuccessExample Success-Response:
*    HTTP/1.1 204 No-Content
*
* @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Server Error
  {
      "error": "Error while trying to get all schedules!"
  }
* @apiSuccessExample Success-Response:
*    HTTP/1.1 206 Partial Content
{
    "schedules": [
        {
            "machine": {
                "type": "otherMachine",
                "id": "5b55f7bf3fe0c8b01713b3f2"
            },
            "_id": "5bfd468fd6b2e95e137bf484",
            "startDate": "2018-11-27T13:28:32.000Z",
            "endDate": "2018-11-27T14:28:32.000Z",
            "fablabId": "5b453ddb5cf4a9574849e98c",
            "orderId": "5bfd430d3192b357d61f6d4c",
            "__v": 0
        },
        {
            "machine": {
                "type": "otherMachine",
                "id": "5b55f7bf3fe0c8b01713b3f2"
            },
            "_id": "5bfd46add6b2e95e137bf485",
            "startDate": "2018-11-27T13:28:32.000Z",
            "endDate": "2018-11-27T14:28:32.000Z",
            "fablabId": "5b453ddb5cf4a9574849e98c",
            "orderId": "5bfd430d3192b357d61f6d4c",
            "__v": 0
        },
        {
            "machine": {
                "type": "otherMachine",
                "id": "5b55f7bf3fe0c8b01713b3f2"
            },
            "_id": "5bfd47486de674612d4a04cd",
            "startDate": "2018-11-27T13:28:32.000Z",
            "endDate": "2018-11-27T14:28:32.000Z",
            "fablabId": "5b453ddb5cf4a9574849e98c",
            "orderId": "5bfd430d3192b357d61f6d4c",
            "__v": 0
        },
        {...}
    ]
}
*/
function getAll (req, res) {
  req.query = validatorService.checkQuery(req.query);
  scheduleService.getAll(undefined, req.query.limit, req.query.skip).then((schedules) => {
    if (schedules.length === 0) {
      logger.info('GET Schedules without result');
      res.status(204).send();
    } else if (req.query.limit && req.query.skip) {
      logger.info(`GET Schedules with partial result ${JSON.stringify(schedules)}`);
      res.status(206).send({ schedules });
    } else {
      logger.info(`GET Schedules with results ${JSON.stringify(schedules)}`);
      res.status(200).send({ schedules });
    }
  }).catch((err) => {
    const error = 'Error while trying to get all schedules!';
    logger.error({ error, stack: err });
    res.status(500).send({ error });
  });
}

/**
 * @api {post} /api/v1/schedules/ Adds a new schedule
 * @apiName createSchedule
 * @apiVersion 1.0.0
 * @apiGroup Schedules
 * @apiHeader (Needed Request Headers) {String} Content-Type application/json
 *
 * @apiParam {Date} startDate is the start date of the schedule for the order and machine (required)
 * @apiParam {Date} endDate is the end date of the schedule for the order and machine (required)
 * @apiParam {Object} machine is a simple machine object containing machineId and machine type (required)
 * @apiParam {String} fablabId is the id of the fablab of the machine (required)
 * @apiParam {String} orderId is the id of the order this schedule belongs to (required)
 *
 * @apiParamExample {json} Request-Example:
{
  "startDate": "Tue Nov 27 2018 17:28:32 GMT+0100 (CET)",
  "endDate": "Tue Nov 27 2018 18:28:32 GMT+0100 (CET)",
  "machine": {
    "type": "otherMachine",
    "id": "5b55f7bf3fe0c8b01713b3f2"
  },
  "fablabId": "5b453ddb5cf4a9574849e98c",
  "orderId":"5bfd430d3192b357d61f6d4c"
}
 *
 * @apiSuccess { Object } schedule the new schedule object, if success
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 Created
{
    "schedule": {
        "_id": "5bfe726ea1353a1b64139ea4",
        "startDate": "2018-11-27T16:28:32.000Z",
        "endDate": "2018-11-27T17:28:32.000Z",
        "machine": {
            "type": "otherMachine",
            "id": "5b55f7bf3fe0c8b01713b3f2"
        },
        "fablabId": "5b453ddb5cf4a9574849e98c",
        "orderId": "5bfd430d3192b357d61f6d4c",
        "__v": 0
    }
}
  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Malformed Request
  {
      "error": "Malformed schedule, one or more parameters wrong or missing"
  }
 */
async function create (req, res) {
  try {
    if (req.body.startDate && req.body.endDate && req.body.machine) {
      await scheduleService.checkDateTime({ id: req.params.id, ...req.body });
    }
  } catch (err) {
    logger.error({ error: err.message, stack: err });
    return res.status(400).send({ error: err.message });
  }

  try {
    const schedule = await scheduleService.create(req.body);
    const machine = await machineService.get(schedule.machine.type, schedule.machine.id);
    if (!machine.schedules.includes(schedule.id)) {
      machine.schedules.push(schedule.id);
      machineService.update(schedule.machine.type, schedule.machine.id, machine);
    }
    logger.info(`POST Schedule with result ${JSON.stringify(schedule)}`);
    return res.status(201).send({ schedule });
  } catch (err) {
    const error = 'Malformed schedule, one or more parameters wrong or missing';
    logger.error({ error, stack: err });
    return res.status(400).send({ error });
  }
}

/**
 * @api {put} /api/v1/schedules/:id Updates a schedule or creates it, if it doesn't exists yet.
 * @apiName updateSchedule
 * @apiVersion 1.0.0
 * @apiGroup Schedules
 * @apiHeader (Needed Request Headers) {String} Content-Type application/json
 *
 * @apiParam {String} id is the id of the schedule (required)
 * @apiParam {Date} startDate is the start date of the schedule for the order and machine
 * @apiParam {Date} endDate is the end date of the schedule for the order and machine
 * @apiParam {Object} machine is a simple machine object containing machineId and machine type
 * @apiParam {String} fablabId is the id of the fablab of the machine
 * @apiParam {String} orderId is the id of the order this schedule belongs to
 *
 * @apiParamExample {json} Request-Example:
{
  "startDate": "Tue Nov 27 2018 11:25:32 GMT+0100 (CET)",
  "endDate": "Tue Nov 27 2018 11:45:32 GMT+0100 (CET)",
  "machine": {
    "type": "otherMachine",
    "id": "5b55f7bf3fe0c8b01713b3f2"
  },
  "fablabId": "5b453ddb5cf4a9574849e98c",
  "orderId":"5bfd430d3192b357d61f6d4c"
}
 * @apiSuccess { Object } schedule the updated schedule
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
{
    "schedule": {
        "machine": {
            "type": "otherMachine",
            "id": "5b55f7bf3fe0c8b01713b3f2"
        },
        "_id": "5bfe726ea1353a1b64139ea4",
        "startDate": "2018-11-27T10:25:32.000Z",
        "endDate": "2018-11-27T10:45:32.000Z",
        "fablabId": "5b453ddb5cf4a9574849e98c",
        "orderId": "5bfd430d3192b357d61f6d4c",
        "__v": 0
    }
}
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Malformed Request
  {
      "error": "Malformed update."
  }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Malformed Request
  {
    "error": "Schedules Dates are between another schedule for the machine 5b55f7bf3fe0c8b01713b3f2"
  }
 */
async function update (req, res) {
  const checkId = validatorService.checkId(req.params.id);
  if (checkId) {
    return res.status(checkId.status).send({ error: checkId.error });
  }
  try {
    if (req.body.startDate && req.body.endDate && req.body.machine) {
      await scheduleService.checkDateTime({ id: req.params.id, ...req.body });
    }
  } catch (err) {
    logger.error({ error: err.message, stack: err });
    return res.status(400).send({ error: err.message });
  }

  try {
    let schedule;
    // old machine is changed in schedule
    if (req.body.machine.type && req.body.machine.id) {
      schedule = await scheduleService.get(req.params.id);
      const oldMachine = await machineService.get(schedule.machine.type, schedule.machine.id);
      if (schedule.machine.type !== req.body.machine.type || schedule.machine.id !== req.body.machine.id) {
        oldMachine.schedules = oldMachine.schedules.filter((e) => e !== schedule.id);
        machineService.update(schedule.machine.type, schedule.machine.id, oldMachine);
      }
    }
    schedule = await scheduleService.update(req.params.id, req.body);
    const machine = await machineService.get(schedule.machine.type, schedule.machine.id);
    if (!machine.schedules.includes(schedule.id)) {
      machine.schedules.push(schedule.id);
      machineService.update(schedule.machine.type, schedule.machine.id, machine);
    }
    logger.info(`PUT Schedule with result ${JSON.stringify(schedule)}`);
    return res.status(200).send({ schedule });
  } catch (err) {
    const error = 'Malformed update.';
    logger.error({ error, stack: err });
    return res.status(400).send({ error });
  }
}

/**
 * @api {delete} /api/v1/schedules/:id Deletes a schedule
 * @apiName deleteSchedule
 * @apiVersion 1.0.0
 * @apiGroup Schedules
 * @apiHeader (Needed Request Headers) {String} Content-Type application/json
 *
 * @apiSuccess { Object } schedule the deleted schedule
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
{
    "schedule": {
        "machine": {
            "type": "otherMachine",
            "id": "5b55f7bf3fe0c8b01713b3f2"
        },
        "_id": "5bfe726ea1353a1b64139ea4",
        "startDate": "2018-11-27T10:25:32.000Z",
        "endDate": "2018-11-27T10:45:32.000Z",
        "fablabId": "5b453ddb5cf4a9574849e98c",
        "orderId": "5bfd430d3192b357d61f6d4c",
        "__v": 0
    }
}
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Malformed Request
  {
      "error": "Malformed Request!"
  }
 */
async function deleteById (req, res) {
  const checkId = validatorService.checkId(req.params.id);
  if (checkId) {
    res.status(checkId.status).send({ error: checkId.error });
  } else {
    try {
      const oldSchedule = await scheduleService.get(req.params.id);
      const schedule = await scheduleService.deleteById(req.params.id);
      const machine = await machineService.get(schedule.machine.type, schedule.machine.id);
      machine.schedules = machine.schedules.filter((e) => e !== oldSchedule.id);
      machineService.update(oldSchedule.machine.type, oldSchedule.machine.id, machine);
      logger.info(`DELETE Schedule with result ${JSON.stringify(schedule)}`);
      res.status(200).send({ schedule });
    } catch (err) {
      const error = 'Malformed Request!';
      logger.error({ error, stack: err });
      res.status(400).send({ error });
    }
  }
}

export default {
  get, getAll, create, update, deleteById
};