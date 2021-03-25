import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registrationRef = new FormGroup({
    fName: new FormControl(),
    lName: new FormControl(),
    user: new FormControl(),
    pass: new FormControl()
  });
  msg: string = "";

  constructor() { }
  ngOnInit(): void { }

  addNewUser() {
    // console.log(this.registrationRef.value);
    this.saveToSession();
  }
  saveToSession() {
    let key = this.registrationRef.value.user;
    if (sessionStorage.getItem(key)) {
      this.msg = "This username is unavailable";
    } else {
      sessionStorage.setItem(key, JSON.stringify(this.registrationRef.value));
      this.msg = "Registration completed";
      this.registrationRef.reset();
    }
  }
}
