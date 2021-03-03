import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase} from "@angular/fire/database";
import { FirebaseService } from "../FirebaseService.service";
import { Volunteer } from './../model/volunteer';
import { ActivatedRoute, Router } from '@angular/router';

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
  userId: any;

  constructor(private firebase: FirebaseService, private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  
  ngOnInit(): void {

    this.userId = this.route.snapshot.paramMap.get('uid');

    this.unregisterForm = this.formBuilder.group({
      event: [null, [Validators.required ]]
    });

    // get initial volunteer events
    this.vEventsObservable = this.firebase.getEventsForVolunteer(this.userId);
    this.vEventsObservable.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        if(snapshot.volunteers.includes(this.userId))
       this.vEventsFor.push(snapshot); 
      });
    });
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

    var eventId = this.unregisterForm.controls.event.value;

    // console.log(this.vEventsFor);
    // var vEvents = this.vEventsFor.filter(e => e.id !== eventId);
    
    // if (vEvents === this.vEventsFor) {
    //   this.success = false;
    //   this.message = "You are not registered to this event!"
    //   return;
    // }

    // var vEventsIds = [];
    // vEvents.forEach(e => vEventsIds.push(e.id));
    // console.log(vEventsIds);

    var eVolunteers;
    this.firebase.getEvent(eventId)
    .subscribe(event => {
      eVolunteers = event.volunteers.filter(vId => vId !== this.userId);
      console.log(eVolunteers);
      if (this.success) {
        this.firebase.unregisterVolunteerFromEvent(eventId, eVolunteers);
        this.message = "Successfully unregistered from event!"
      } else {
        this.message = "Error: Unable to unregister from event"
      }  
    });
    
  }

}
