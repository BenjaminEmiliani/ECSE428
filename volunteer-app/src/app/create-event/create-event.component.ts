import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase} from "@angular/fire/database";
import {FirebaseService} from "../FirebaseService.service";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  constructor(private db: AngularFireDatabase, private firebase: FirebaseService) { }

  ngOnInit(): void {
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
