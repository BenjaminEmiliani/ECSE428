import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateVolunteerComponent } from './create-volunteer/create-volunteer.component';
import { SignupComponent } from './signup/signup.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { EventRegistrationComponent } from './event-registration/event-registration.component';

const routes: Routes = [
  { path: 'create-event', component: CreateEventComponent},
  { path: 'event-registration', component: EventRegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup-volunteer', component: CreateVolunteerComponent },
  { path: 'signup-organiser', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

 
