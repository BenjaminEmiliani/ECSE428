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

  constructor(private db: AngularFireDatabase, private firebase: FirebaseService) { }

  ngOnInit(): void {
    this.user = this.firebase.getVolunteer("jd3291")
    .subscribe((element) => {
      this.user = element;
    });
  }

  //Example method to update a volunteer
  updateJohn(): void{
    
    var inputValue = (<HTMLInputElement>document.getElementById("a")).value;
    this.firebase.updateVolunteer("af9247", inputValue, "Doe", "4234", "123");
  }

  createEvent(): void{
    var eName = (<HTMLInputElement>document.getElementById("name")).value;
    var eCategory = (<HTMLInputElement>document.getElementById("category")).value;
    var eStartTime = (<HTMLInputElement>document.getElementById("startTime")).value;
    var eEndTime = (<HTMLInputElement>document.getElementById("endTime")).value;
    var eDate = (<HTMLInputElement>document.getElementById("date")).value;
    var eOrganizer = (<HTMLInputElement>document.getElementById("organizer")).value;

    this.firebase.createEvent(eName, eCategory, eDate, eStartTime, eEndTime, eOrganizer, []);
  }
}
