import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase} from "@angular/fire/database";
import { Volunteer } from "../model/volunteer";
import {FirebaseService} from "../FirebaseService.service"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any;
  model = new Volunteer();

  constructor(private db: AngularFireDatabase, private firebase: FirebaseService,) { }

  ngOnInit(): void {
    this.user = this.firebase.getVolunteer("jd3291")
    .subscribe((element) => {
      this.user = element;
    });
  }
}
