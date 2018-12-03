import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { routes } from '../config/routes';
import { Schedule } from '../models/schedule.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private p: String;

  constructor(private http: HttpClient) {
    this.p = routes.backendUrl + '/' + routes.paths.backend.schedules.root;
  }

  public getAll(limit?, skip?): Promise<any> {
    let params = new HttpParams();
    if (limit >= 0 && skip >= 0) {
      params = params.append('limit', limit);
      params = params.append('skip', skip);
    }
    return this.http.get(`${this.p}`, { params: params }).toPromise();
  }

  public create(schedule): Promise<any> {
    return this.http.post(`${this.p}`, schedule).toPromise();
  }

  public update(schedule: Schedule): Promise<any> {
    return this.http.put(`${this.p}/${schedule._id}`, schedule).toPromise();
  }

  public deleteSchedule(id): Promise<any> {
    return this.http.delete(`${this.p}/${id}`).toPromise();
  }

  public getScheduleById(id): Promise<any> {
    return this.http.get(`${this.p}/${id}`).toPromise();
  }
}
