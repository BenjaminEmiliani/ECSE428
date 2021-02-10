import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-registration',
  templateUrl: './event-registration.component.html',
  styleUrls: ['./event-registration.component.css']
})
export class EventRegistrationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // register an volunteer for an event
  register(): void{
    var inputVolunteerID = (<HTMLInputElement>document.getElementById("volunteer-id")).value;
    var inputEventID = (<HTMLInputElement>document.getElementById("event-id")).value;

    //TODO: register them for the event by adding to volunteer node and event node
    //this.firebase.updateVolunteer("jd3291", inputValue, "Doe", "4234", "123");
  }
}
