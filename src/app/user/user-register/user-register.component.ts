import { Component, OnInit, ɵsetUnknownPropertyStrictMode } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { user } from 'src/app/model/user.model';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registerForm!: FormGroup
  user!: user;
isSubmitted:boolean=false;

  constructor(private fb: FormBuilder,private userService:UserServiceService,private alertify: AlertifyService) {

  }

  ngOnInit(): void {
    //this.registerForm = new FormGroup({
    //userName: new FormControl(null, Validators.required),
    // email: new FormControl(null, [Validators.required, Validators.email]),
    // password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    // confirmPassword: new FormControl(null, [Validators.required]),
    // mobile: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
    //},this.passwordMatchinghValidator)
    this.CreateRegistrationFomr();
  }

  CreateRegistrationFomr() {
    this.registerForm = this.fb.group({
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.maxLength(10)]],
    }, { validators: this.passwordMatchinghValidator })
  }

  passwordMatchinghValidator(fgrp: AbstractControl): ValidationErrors | null {
    return fgrp.get('password')?.value === fgrp.get('confirmPassword')?.value ? null : { notMatched: true }
  }

  get UserName() {
    return this.registerForm.get('userName') as FormControl;
  }

  get Email() {
    return this.registerForm.get('email') as FormControl;
  }
  get Password() {
    return this.registerForm.get('password') as FormControl;
  }
  get ConfirmPassword() {
    return this.registerForm.get('confirmPassword') as FormControl;
  }
  get Mobile() {
    return this.registerForm.get('mobile') as FormControl;
  }
  GetData():user{

    return this.user={
      userName:this.UserName.value,
      email: this.Email.value,
      password: this.Password.value,
      mobile: this.Mobile.value
    }
  }

  onSubmit() {

    this.isSubmitted = true;

    if(this.registerForm.valid){
    //this.user = Object.assign(this.registerForm.value);
    this.userService.AddUser(this.GetData());
    this.registerForm.reset(); 
    this.isSubmitted = false;

    this.alertify.success('Register Successfully');
    }else{
      this.alertify.error('Kindly provide the required fields');
    }
  }
}
