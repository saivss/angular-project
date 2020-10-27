import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

export interface User {
  id: string;
  active: boolean;
  name: string;
  dateOfBirth?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EnrolleesService {

  url = `${environment.apiBaseUrl}/enrollees`;

  constructor(private http: HttpClient) { }

  getAll(): Promise<User[]> {
    return (this.http.get(`${this.url}`) as Observable<User[]>).toPromise();
  }

  put(enrollee: User): Promise<User> {
    return (this.http.put(`${this.url}/${enrollee.id}`, enrollee) as Observable<User>).toPromise();
  }
}
