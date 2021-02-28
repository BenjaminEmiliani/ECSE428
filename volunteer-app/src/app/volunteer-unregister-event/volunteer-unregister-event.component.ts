import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase} from "@angular/fire/database";
import { FirebaseService } from "../FirebaseService.service";

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
  events = []
  maxOptionsLimit = 100


  constructor(private db: AngularFireDatabase, private firebase: FirebaseService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.unregisterForm = this.formBuilder.group({
      event: [null, [Validators.required ]]
    });

    // get initial events
    this.events = []
    //temp commented out bc of overwhelmed # of events in db)
    this.firebase.getEventsForVolunteer("sh9930").subscribe(
      (events) => {
        console.log(events.length + " events");
        var lim = (events.length> this.maxOptionsLimit) ? this.maxOptionsLimit : events.length
        for(var i = 0; i < lim; i++) {
          if(events[i].volunteers.filter(v  => v.id === "sh9930")) {
            this.events.push({
              id: events[i].id, 
              name: events[i].name,
              volunteers: events[i].volunteers,
            })
          }   
        }
    });

  }

  submit() {
    this.submitted = true
    console.log(this.unregisterForm.value)
    if (this.unregisterForm.invalid){
      // data validation prompts are already done in html
      return;
    } else {
      this.unregister()
    }
    
  }

  test(): void {
    this.firebase.getEventsForVolunteer("sh9930");
  }

  unregister(): void {}

}
