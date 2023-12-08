import { Injectable } from '@angular/core';
import { user } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor() { }

  AddUser(user: user) {
    let users = [];

    if (localStorage.getItem('Users')) {
      users = JSON.parse(localStorage.getItem('Users')!);

      users = [user, ...users];
    }
    else {
      users = [user];
    }

    localStorage.setItem('Users', JSON.stringify(users));
  }
}
