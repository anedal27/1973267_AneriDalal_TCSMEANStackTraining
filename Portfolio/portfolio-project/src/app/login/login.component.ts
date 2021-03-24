import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginRef = new FormGroup({
    user: new FormControl(),
    pass: new FormControl()
  })
  msg:string = "";

  constructor(public router:Router) { }
  ngOnInit(): void { }

  checkUser() {
    let user = this.loginRef.value.user;
    let pass = this.loginRef.value.pass;
    let sessionUser: any = sessionStorage.getItem(user);
    if (sessionUser != null) {
      sessionUser = JSON.parse(sessionUser as string);
      let sessionPass = sessionUser.pass;
      if(pass == sessionPass) {
        this.msg = "Hooray";
        this.router.navigate(["landing"]);
      } else {
        this.msg = "Nope";
      }
    } else {
      this.msg = "Oops";
    }
  }
}
