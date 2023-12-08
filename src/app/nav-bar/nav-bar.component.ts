import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
loggedInUser:string='';

  constructor() { }

  ngOnInit() {
  }

  IsLogedIn() {
    this.loggedInUser = localStorage.getItem('token')!;
    return this.loggedInUser;
  }

  OnLogout(){
    localStorage.removeItem('token');
  }
}
