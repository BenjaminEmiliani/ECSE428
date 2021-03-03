import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from "@angular/fire/database";
import { Volunteer } from "../model/volunteer";
import { FirebaseService } from "../FirebaseService.service"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userId : String = "";
  model = new Volunteer();
  volunteers = []
  loginForm: FormGroup;
  submitted = false;
  isEnabled;
 

  constructor(private db: AngularFireDatabase, private firebase: FirebaseService, private formBuilder: FormBuilder, private r: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],

    });

    //all volunteers from the database
    this.firebase.getVolunteers().subscribe(
      (volunteers) => {
        console.log(volunteers)
        for (var i = 0; i < volunteers.length; i++) {
          this.volunteers.push({
            password: volunteers[i].password,
            email: volunteers[i].email,
            userid: volunteers[i]
          })
        }
      });

    //all organizers from the database TODO

  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    else {
      console.log("login")
      console.log('email=' + this.f.email.value)
      console.log('password=' + this.f.password.value)
      this.checkIfExists();
    }
  }
  //check if email and password exists in database
  checkIfExists(): void {
    var emailcheck = this.f.email.value;
    var passcheck = this.f.password.value;

    //check in volunteers
    for (var v of this.volunteers) {
      if (v.email == emailcheck && v.password == passcheck) {
        this.userId = v.userid.id;
        this.router.navigate(['/homepage', {uid: this.userId}]);
        console.log("Login successful with" + emailcheck);
        (<HTMLInputElement>document.getElementById("displayLogin")).innerHTML = "<span style='color: green;'> Successful login! </span>";
        return;
      }
    }

    //check in organizers TODO


    // if not found in both volunteers and organizers
    console.log("Login unsuccessful");
    (<HTMLInputElement>document.getElementById("displayLogin")).innerHTML = "<span style='color: red;'> Incorrect email or password </span>";
  }


}
