import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../FirebaseService.service';

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.css']
})
export class AssignTaskComponent implements OnInit {

  assignForm: FormGroup;
  submitted = false;
  success = false;
  volunteers = [];
  tasks = [];
  events = [];
  maxOptionsLimit: 100;


  constructor(private db: AngularFireDatabase, private firebase: FirebaseService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.assignForm = this.formBuilder.group({
      volunteer: [null, Validators.required],
      event: [null, [Validators.required ]]
    });

    this.volunteers = []
    this.firebase.getVolunteers().subscribe(
      (volunteers) => {
     //   console.log(volunteers)
        console.log(volunteers.length + " volunteers");
        var lim = (volunteers.length> this.maxOptionsLimit) ? this.maxOptionsLimit : volunteers.length
        for(var i=0; i<lim; i++){
          this.volunteers.push({
            id: volunteers[i].id, 
            name: volunteers[i].first_name + " " + volunteers[i].last_name,
            events: volunteers[i].events,
          })
        }
    });

    //this.events = [];
    this.firebase.getEvents().subscribe(
      (events) => {
     //   console.log(events)
        console.log(events.length + " events");
        var lim = (events.length> this.maxOptionsLimit) ? this.maxOptionsLimit : events.length
        for(var i=0; i<lim; i++){
          this.events.push({
            id: events[i].id, 
            name: events[i].name,
            volunteers: events[i].volunteers,
          })
        }
    });
    
  }

  submit(): void{

  }

}
