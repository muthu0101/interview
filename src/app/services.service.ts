import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})

export class ServicesService {

  constructor(private http: HttpClient) { }

  getUsersJson() {
    return this.http.get<User[]>(`${environment.jsonApi}users`);
  }

  getUsersXML() {
    return this.http.get(`${environment.xmlApi}users`, {responseType: 'text'});
  }
}
