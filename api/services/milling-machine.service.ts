import { MachineService } from './machine.service';
/* eslint-disable no-unused-vars */
import ModelService from './model.service';
/* eslint-enable no-unused-vars */

export class MillingMachineService implements ModelService {
  machineType = 'millingMachine';

  machineService = new MachineService();

  /**
   * This method gets all milling machines. The result can be limited as well as some items skipped
   * @param query is a mongodb query expression
   * @param limit is the limit of items to get
   * @param skip is the amount of items to skip (counted from the beginning)
   * @returns a promise with the results
   */
  public getAll (query?: any, limit?: string, skip?: string) {
    let l: Number;
    let s: Number;
    if (limit && skip) {
      l = Number.parseInt(limit, 10);
      s = Number.parseInt(skip, 10);
    }
    return this.machineService.getMachineType(this.machineType, query, l, s);
  }

  /**
   * This method creates a new milling machine
   * @param params are the params for the milling machine
   * @returns a promise with the results
   */
  public create (params) {
    return this.machineService.create(this.machineType, params);
  }

  /**
   * This method deletes a milling machine by its id
   * @returns a promise with the result
   */
  public deleteById (id) {
    return this.machineService.deleteById(this.machineType, id);
  }

  /**
   * This method gets a milling machine by its id
   * @param id is the id of the milling machine
   * @returns a promise with the results
   */
  public get (id) {
    return this.machineService.get(this.machineType, id);
  }

  /**
   * This method updates a milling machine
   * @param id is the id of the milling machine
   * @param machine is the machine obj that updates the milling machine
   * @returns a promise with the results
   */
  public update (id, machine) {
    return this.machineService.update(this.machineType, id, machine);
  }

  /**
   * This method counts all milling machine
   * @param query is a mongodb query expression
   * @returns a promise with the result
   */
  public count (query: any) {
    return this.machineService.count(this.machineType, query);
  }
}

export default MillingMachineService;
