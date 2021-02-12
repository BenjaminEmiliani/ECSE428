import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase} from "@angular/fire/database";
import {FirebaseService} from "../FirebaseService.service";
import { Volunteer } from '../model/volunteer';
import { Event } from '../model/event';

@Component({
  selector: 'app-event-registration',
  templateUrl: './event-registration.component.html',
  styleUrls: ['./event-registration.component.css']
})
export class EventRegistrationComponent implements OnInit {

  registerForm: FormGroup
  submitted = false
  
  volunteers = []
  events = []

  // if we have extra time:
  // display event name date info etc
  // do not allow selecting events in front-end if already occured or are cancelled

  constructor(private db: AngularFireDatabase, private firebase: FirebaseService, private formBuilder: FormBuilder) {
  }

  // initialize empty form and get initial volunteer and event list
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      volunteer: [null, Validators.required],
      event: [null, [Validators.required ]]
    });

    // TODO: figure out why this results in repeated lists in the front-end dropdown menu
    // get initial volunteers
    this.firebase.getVolunteers().subscribe(
      (volunteers) => {
        console.log(volunteers)
        console.log(volunteers.length + " volunteers");
        for(var i=0; i<volunteers.length; i++){
          this.volunteers.push({
            id: volunteers[i].id, 
            name: volunteers[i].first_name + " " + volunteers[i].last_name,
            events: volunteers[i].events,
          })
        }
    });

    // get initial events
    this.firebase.getEvents().subscribe(
      (events) => {
        console.log(events)
        console.log(events.length + " events");
        for(var i=0; i<events.length; i++){
          this.events.push({
            id: events[i].id, 
            name: events[i].name,
            volunteers: events[i].volunteers,
          })
        }
    });
  }

  // this function is called when the user clicks "Register for Event" button to submit the form
  submit() {
    this.submitted = true
    console.log(this.registerForm.value)
    if (this.registerForm.invalid){
      // data validation prompts are already done in html
      return;
    } else {
      console.log("submitted registration for event")
      this.register()
    }
    
  }
  
  // this function actually registers the the volunteer for an event
  register(): void{
    var success = true;
    var volunteerID = this.registerForm.controls.volunteer.value
    var eventID = this.registerForm.controls.event.value

    //TODO - create registerVolunteerEvent() function in FirebaseService
    // cases: register success, already registered for this event, event is past date, event is cancelled, or other register failure

    var vol;
    var event;

    for(var v of this.volunteers) {
      if (v.id == volunteerID) {
        vol = {
          events: v.events,
        }
      }
    }

    for(var e of this.events) {
      if (e.id == eventID) {
        event = {
          volunteers: e.volunteers,
        }
      }
    }
    

    if (vol.events == undefined) {
      vol.events = new Array();
    }

    if (event.volunteers == undefined) {
      event.volunteers = new Array();
    }

    for(e of vol.events) {
      if (e.match(eventID)) {
        console.log("Error already registered for this event");
        success = false;
      }
    }

    for(v of event.volunteers) {
      if (v.match(volunteerID)) {
        console.log("Error volunteer already registered for this event");
        success = false;
      }
    }

    if (success) {
      vol.events.push(eventID);
      event.volunteers.push(volunteerID);
      
      this.firebase.registerVolunteerEvent(volunteerID, vol.events, eventID, event.volunteers);
    } else {
      console.log("Error did not register for this event");
    }
    
  }
}
