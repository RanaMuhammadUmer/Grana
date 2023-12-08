import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private auth: AuthService, private alert:AlertifyService, private router: Router) {

  }

  ngOnInit(): void {
  }

  onLogin(loginForm: NgForm) {

    const token = this.auth.AuthUser(loginForm.value);

    if (token) {
      localStorage.setItem('token', token.userName);
      this.alert.success('login success');
      this.router.navigate(['/']);
    } else {
      this.alert.error('Incorrect UserName and Password');

    }
  }
}
