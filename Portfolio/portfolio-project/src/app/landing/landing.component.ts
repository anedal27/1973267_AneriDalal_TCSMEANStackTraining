import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  currentUser: string = sessionStorage.getItem("CurrentUser") as string;;
  fName: string = "";
  lName: string = "";
  contacts: Array<[string, string]> = new Array();

  landingRef = new FormGroup({
    name: new FormControl(),
    phone: new FormControl()
  })

  constructor(public router: Router) {
    let userInfo = this.getUserInfo()
    this.fName = userInfo.fName;
    this.lName = userInfo.lName;
    if (userInfo.contacts) {
      this.contacts = userInfo.contacts;
    }
  }
  ngOnInit(): void { }

  addContact() {
    if (this.landingRef.value.name != null && this.landingRef.value.phone != null) {
      this.contacts.push([this.landingRef.value.name, this.landingRef.value.phone]);
      let userInfo = this.getUserInfo();
      userInfo.contacts = this.contacts;
      sessionStorage.setItem(this.currentUser, JSON.stringify(userInfo));
      this.landingRef.reset();
    }
  }
  getUserInfo(): any {
    let userInfo = JSON.parse(sessionStorage.getItem(this.currentUser) as string);
    return userInfo;
  }
  logout() {
    sessionStorage.removeItem("CurrentUser");
    this.router.navigate(["login"]);
  }
}
