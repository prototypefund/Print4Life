import machineService from '../services/machine.service';

const machineType = 'millingMachine';

function getAll (limit?: string, skip?: string) {
  let l: Number;
  let s: Number;
  if (limit && skip) {
    l = Number.parseInt(limit, 10);
    s = Number.parseInt(skip, 10);
  }
  return machineService.getMachineType(machineType, l, s);
}

function create (params) {
  return machineService.create(machineType, params);
}

function get (id) {
  return machineService.get(machineType, id);
}

function deleteById (id) {
  return machineService.deleteById(machineType, id);
}

function update (id, machine) {
  return machineService.update(machineType, id, machine);
}

function count () {
  return machineService.count(machineType);
}

export default {
  getAll, create, get, deleteById, update, count
};
