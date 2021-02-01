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
}