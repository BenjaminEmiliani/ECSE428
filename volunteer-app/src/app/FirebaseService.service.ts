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

  //Add a new volunteer to the database
  createVolunteer(firstName, lastName, email,  password, phoneNumber, dob): void{
    let randomId = Math.floor((Math.random() * 9999) + 1000);;
    let userId = firstName.charAt(0).toLowerCase() + lastName.charAt(0).toLowerCase() + randomId;
    console.log("here");
    this.db.object("volunteer/" + userId).update({
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
    // let randomId = Math.floor((Math.random() * 9999) + 1000);;
    // let eventId = name.charAt(0).toLowerCase() + randomId;
    this.db.list("event/").push({
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

  // need to fix
  getEventsForVolunteer(userid: string) : Observable<any[]> {
    // var volunteer = this.getVolunteer(userid);
    this.volunteerEventsRef = this.db.list("event");
    this.volunteerEvents = this.volunteerEventsRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ id: c.payload.key, ...c.payload.val() }))
        )
      );
    return this.volunteerEvents;
  }


  registerVolunteerEvent(volunteerID, eventList, eventID, volunteerList): boolean {
    this.db.object("event/" + eventID).update({
      volunteers: volunteerList,
    });

    return true;
  } 


  unregisterVolunteerFromEvent(volunteerid, eventid, eventlist, volunteerlist): boolean {

    this.db.object(`volunteer/${volunteerid}`).update({
      events: eventlist,
    });

    this.db.object(`event/${eventid}`).update({
      volunteers: volunteerlist
    });

    return true;
  }

}