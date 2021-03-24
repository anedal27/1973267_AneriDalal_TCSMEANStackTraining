import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  currentUser:string = "";
  fName:string = "";
  lName:string = "";
  contacts:{} = {};

  landingRef = new FormGroup({
    name: new FormControl(),
    phone: new FormControl()
  })

  constructor() {
    this.currentUser = sessionStorage.getItem("CurrentUser") as string;
    let sessionInfo = JSON.parse(sessionStorage.getItem(this.currentUser) as string);
    this.fName = sessionInfo.fName;
    this.lName = sessionInfo.lName;
  }
  ngOnInit(): void { }

  addContact() {
    console.log(this.landingRef.value);
  }
}
