import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { enrollees } from '../mocks/enrolless';

export interface User {
  id: string;
  active: boolean;
  name: string;
  dateOfBirth?: string;
}

@Injectable()
export class EnrolleesServiceStub {

  enrollees: User[] = enrollees;

  constructor() { }

  getAll(): Promise<User[]> {
    return new Promise((resolve, reject) => resolve(this.enrollees));
  }

  put(enrollee: User): Promise<User> {
    return new Promise((resolve, reject) => resolve(enrollee));
  }
}
