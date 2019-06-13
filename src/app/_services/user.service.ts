import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../_models';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getAll() {
    console.log('getAll() UserService');
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getById(id: number) {
    console.log('getById() UserService');
    return this.http.get(`${environment.apiUrl}/users/` + id);
  }

  register(user: User) {
    console.log('register() UserService');
    return this.http.post(`${environment.apiUrl}/users/register`, user);
  }

  update(user: User) {
    console.log('update() UserService');
    return this.http.put(`${environment.apiUrl}/users/` + user.id, user);
  }

  delete(id: number) {
    console.log('delete() UserService');
    return this.http.delete(`${environment.apiUrl}/users/` + id);
  }
}
