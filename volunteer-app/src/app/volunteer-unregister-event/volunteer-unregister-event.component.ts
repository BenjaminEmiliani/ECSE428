import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase} from "@angular/fire/database";
import { FirebaseService } from "../FirebaseService.service";
import { Observable } from 'rxjs';
import { Volunteer } from './../model/volunteer';

@Component({
  selector: 'app-volunteer-unregister-event',
  templateUrl: './volunteer-unregister-event.component.html',
  styleUrls: ['./volunteer-unregister-event.component.css']
})

export class VolunteerUnregisterEventComponent implements OnInit {

  unregisterForm: FormGroup;
  submitted = false;
  success = false;
  message = "";
  volunteers = [];
  private vEventsObservable; 
  vEvents: any = [];
  vEventsFor = [];
  maxOptionsLimit = 100;


  constructor(private db: AngularFireDatabase, private firebase: FirebaseService, private formBuilder: FormBuilder) { }

  // @Input() userId: string;
  ngOnInit(): void {

    this.unregisterForm = this.formBuilder.group({
      event: [null, [Validators.required ]]
    });

    // get initial volunteer events
    this.vEventsObservable = this.firebase.getEventsForVolunteer("sh2327");
    this.vEventsObservable.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        if(snapshot.volunteers.includes("sh2327"))
       this.vEventsFor.push(snapshot); 
      });
    });

    
    // this.firebase.getEventsForVolunteer("sh2327").subscribe(
    //   (events) => {
    //     console.log(events.length + " events");
    //     var lim = (events.length> this.maxOptionsLimit) ? this.maxOptionsLimit : events.length
    //     for(var i = 0; i < lim; i++) {
    //       if(events[i].volunteers.contains("sh2327")) {
    //         this.vEvents.push({
    //           id: events[i].id, 
    //           name: events[i].name,
    //           volunteers: events[i].volunteers,
    //         })
    //       }    
    //     }
    // });

  }

  log(){
    
    this.vEvents.forEach(e => {
      console.log("e.name");
      console.log(e.name);
     })
 
  }
  submit() {
    this.submitted = true
    if (this.unregisterForm.invalid){
      // data validation prompts are already done in html
      return;
    } else {
      this.unregister()
    }
    
  }

  test(): void {
    var vEvents = this.vEventsFor.filter(e => e.id !== "-MUdvkq2gUXFNZs8SgUF");
    const vEventsIds = [];
    vEvents.forEach(e => vEventsIds.push(e.id));
    console.log(vEventsIds);
    
  }

  unregister(): void {
    this.success = true;

    var volunteerId = "sh2327"; // need to change
    var eventId = this.unregisterForm.controls.event.value;

    // console.log(this.vEventsFor);
    var vEvents = this.vEventsFor.filter(e => e.id !== eventId);
    
    if (vEvents === this.vEventsFor) {
      this.success = false;
      this.message = "You are not registered to this event!"
      return;
    }

    var vEventsIds = [];
    vEvents.forEach(e => vEventsIds.push(e.id));
    // console.log(vEventsIds);

    var eVolunteers;
    this.firebase.getEvent(eventId)
    .subscribe(event => {
      eVolunteers = event.volunteers.filter(vId => vId !== volunteerId);
      console.log(eVolunteers);
      if (this.success) {
        this.firebase.unregisterVolunteerFromEvent(volunteerId, eventId, vEventsIds, eVolunteers);
        this.message = "Successfully unregistered from event!"
      } else {
        this.message = "Error: Unable to unregister from event"
      }  
    });
    
  }

}
