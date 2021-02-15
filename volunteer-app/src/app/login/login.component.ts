import { Component, OnInit } from '@angular/core';
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

  user: any;
  model = new Volunteer();
  volunteers = []
  loginForm: FormGroup;
  submitted = false;

  constructor(private db: AngularFireDatabase, private firebase: FirebaseService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.user = this.firebase.getVolunteer("jd3291")
      .subscribe((element) => {
        this.user = element;
      });

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
        console.log("Login successful with" + emailcheck);
        (<HTMLInputElement>document.getElementById("displayLogin")).innerHTML = "<span style='color: red;'> Succesful login! </span>";
      } else
        (<HTMLInputElement>document.getElementById("displayLogin")).innerHTML = "<span style='color: red;'> Incorrect email or password </span>";
    }

    //check in organizers TODO

  }

  //Example method to update a volunteer
  updateJohn(): void {

    var inputValue = (<HTMLInputElement>document.getElementById("nameInput")).value;
    this.firebase.updateVolunteer("jd3291", inputValue, "Doe", "4234", "123");

  }

}
