import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  AuthUser(user: any) {
    debugger
    let userArray = [];

    if (localStorage.getItem("Users")) {
      userArray = JSON.parse(localStorage.getItem("Users")!);

      return userArray.find((x: { userName: any; password: any; }) => x.userName === user.userName && x.password === user.password);
    }
  }
}
