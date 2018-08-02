import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { config } from '../config/config';

const p = config.backendUrl + '/' + config.paths.orders.root;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  public getAllOrders(): Promise < any > {
    return this.http.get(`${p}`, httpOptions).toPromise();
  }

  public createOrder(order): Promise < any > {
      return this.http.post(`${p}/${config.paths.orders.createOrder}`, order, httpOptions).toPromise();
  }
  public updateOrder(order): Promise < any > {
    return this.http.post(`${p}/${config.paths.orders.updateOrder}`, order, httpOptions).toPromise();
  }

  public deleteOrder(id): Promise < any > {
    return this.http.delete(`${p}/${config.paths.orders.deleteOrder}/${id}`, httpOptions).toPromise();
  }

  public getOrderById(id): Promise < any > {
    return this.http.get(`${p}/${id}`, httpOptions).toPromise();
  }

  public getStatus(): Promise < any > {
    return this.http.get(`${p}/${config.paths.orders.getStatus}`, httpOptions).toPromise();
  }
}
