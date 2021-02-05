import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Observable } from "rxjs";
import { map} from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})

export class FirebaseService {

  volunteerRef: AngularFireList<any>;
  volunteers: Observable<any[]>;
  eventRef: AngularFireList<any>;
  events: Observable<any[]>;
  user: Observable<any>;

  
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
    return this.db.object("volunteer/" + userId).valueChanges();
  }

  // Update volunteer information using userId
  updateVolunteer(userId, firstName, lastName, phoneNumber, password ): any{
    this.db.object("volunteer/" + userId).update({
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      password: password,
    });
  }

  //Add a new volunteer to the database
  createVolunteer(firstName, lastName, email, phoneNumber, password): void{
    let randomId = Math.floor((Math.random() * 9999) + 1000);;
    let userId = firstName.charAt(0).toLowerCase() + lastName.charAt(0).toLowerCase() + randomId;
    console.log("here");
    this.db.object("volunteer/" + userId).update({
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      password: password,
      email: email
    });
  }
}