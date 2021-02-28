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

  unregisterForm: FormGroup
  submitted = false
  success = false
  message = ""
  volunteers = []
  private vEventsObservable; 
  vEvents = []
  vEventsFor = []
  maxOptionsLimit = 100


  constructor(private db: AngularFireDatabase, private firebase: FirebaseService, private formBuilder: FormBuilder) { }

  // @Input() userId: string;
  async ngOnInit(): Promise<void> {

    this.unregisterForm = this.formBuilder.group({
      event: [null, [Validators.required ]]
    });

    // get initial volunteer events
    this.vEventsObservable = this.firebase.getEventsForVolunteer("sh9930");
    this.vEventsObservable.subscribe(async (snapshots) => {
      snapshots.forEach(snapshot => {
       this.vEvents.push(snapshot); 
      });
    });

    console.log(this.vEvents);

    this.vEvents.forEach(e => {
      console.log(e.volunteers);
      // if (e.volunteers.includes("sh9930")) {
      //   this.vEventsFor.push(e);
      // }
    })
    // this.firebase.getEventsForVolunteer("sh9930").subscribe(
    //   (events) => {
    //     console.log(events.length + " events");
    //     var lim = (events.length> this.maxOptionsLimit) ? this.maxOptionsLimit : events.length
    //     for(var i = 0; i < lim; i++) {
    //       if(events[i].volunteers.contains("sh9930")) {
    //         this.vEvents.push({
    //           id: events[i].id, 
    //           name: events[i].name,
    //           volunteers: events[i].volunteers,
    //         })
    //       }    
    //     }
    // });

  }

  submit() {
    // this.submitted = true
    // console.log(this.unregisterForm.value)
    // if (this.unregisterForm.invalid){
    //   // data validation prompts are already done in html
    //   return;
    // } else {
    //   this.unregister()
    // }
    
  }

  test(): void {
    this.firebase.getEventsForVolunteer("sh9930");
  }

  unregister(): void {
    // this.success = true;

    // var volunteerId = "sh9930"; // need to change
    // var eventId = this.unregisterForm.controls.event.value;

    // var volunteerEvents = this.vEvents.filter(e => e.id !== eventId);

    // if (volunteerEvents === this.vEvents) {
    //   this.success = false;
    //   this.message = "You are not registered to this event!"
    //   return;
    // }

    // var eventVolunteers;
    // this.firebase.getEvent(eventId).subscribe(res => eventVolunteers = res.volunteers)
  }

}
