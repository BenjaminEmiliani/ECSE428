import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Observable } from "rxjs";
import { map} from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Organizer } from './model/organizer';
import { Event } from './model/event';
import { Volunteer } from './model/volunteer';

@Injectable({
  providedIn: "root",
})

export class FirebaseService {

  volunteerRef: AngularFireList<any>;
  volunteers: Observable<any[]>;
  eventRef: AngularFireList<any>;
  events: Observable<any[]>;
  volunteerEventsRef: AngularFireList<any>;
  volunteerEvents: Observable<any>;
  user: Observable<any>;
  vols = [];
  tasks: Observable<any[]>;
  taskRef: AngularFireList<any>;
  vol;

  
  constructor(private db: AngularFireDatabase) {}

  //Return list of volunteers in firebase db
  getVolunteers(): Observable<any[]> {
    this.volunteerRef = this.db.list("volunteer");
    this.volunteers = this.volunteerRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ id: c.payload.key, ...c.payload.val() }))
        )
      );
    return this.volunteers;
  }

  //Return a volunteer in firebase db using its userId
  getVolunteer(userId): Observable<any> {
    return this.db.object("volunteer/" + userId).snapshotChanges();
  }

  getUserIdByEmail(emailcheck):String {
   var id: String;
    this.getVolunteers();
    this.volunteers.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        if(snapshot.email == emailcheck)
       id = snapshot;
      });
    });
    return id;
  }

  // Update volunteer information using userId
  updateVolunteer(userId, firstName, lastName, phoneNumber, password): any{
    this.db.object("volunteer/" + userId).update({
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      password: password,
    });
  }

  addTaskToEvent(eventId, newTask): any{
    this.db.list("event/" + eventId + "/tasks").push({
      name: newTask  
    });
  }

  assignVolunteerToTask(eventId, taskId, volunteerId): any {
    
    this.db.object("event/" + eventId + "/tasks/" + taskId).update({
      volunteer: volunteerId
    });
  }


  //Add a new volunteer to the database
  createVolunteer(firstName, lastName, email,  password, phoneNumber, dob): void{
    let randomId = Math.floor((Math.random() * 9000) + 1000);;
    let userId = firstName.charAt(0).toLowerCase() + lastName.charAt(0).toLowerCase() + randomId;
    this.db.object("volunteer/" + userId).update({
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      password: password,
      email: email,
      dob: dob,
    });
  }

  //Add a new volunteer to the database
  createOrganizer(firstName, lastName, email,  password, phoneNumber, dob): void{
    let randomId = Math.floor((Math.random() * 9999) + 1000);;
    let userId = firstName.charAt(0).toLowerCase() + lastName.charAt(0).toLowerCase() + randomId;
    this.db.object("organizer/" + userId).update({
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      password: password,
      email: email,
      dob: dob,
    });
  }

  //Add a new event to the database
  createEvent(name, category, date, stime, etime, organizer, tasks): void{
     let randomId = Math.floor((Math.random() * 9000) + 1000);;
     let eventId = name + randomId;
    this.db.object("event/"+ eventId).update({
      name: name,
      category: category,
      date: date,
      startTime: stime,
      endTime: etime,
      organizer: organizer,
      tasks: [],
      volunteers: []
    });
  }

  getEvent(eid): Observable<any> {
    return this.db.object("event/" + eid).valueChanges();
  }

  getTasks(eid): Observable<any[]> {
    this.taskRef = this.db.list("event/" + eid + "/tasks");
    this.tasks = this.taskRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ id: c.payload.key, ...c.payload.val() }))
        )
      );
    return this.tasks;
  }

   //Return list of all events in firebase db
   getEvents(): Observable<any[]> {
    this.eventRef = this.db.list("event");
    this.events = this.eventRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ id: c.payload.key, ...c.payload.val() }))
        )
      );
    return this.events;
  }


  registerVolunteerEvent(volunteerID, eventList, eventID, volunteerList): boolean {
    this.db.object("event/" + eventID).update({
      volunteers: volunteerList,
    });
    return true;
  } 

  unregisterVolunteerFromEvent(eventid, volunteerlist): boolean {
    this.db.object(`event/${eventid}`).update({
      volunteers: volunteerlist
    });
    return true;
  }
}