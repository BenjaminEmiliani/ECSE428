import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateVolunteerComponent } from './create-volunteer/create-volunteer.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { EventRegistrationComponent } from './event-registration/event-registration.component';
import { VolunteerUnregisterEventComponent } from './volunteer-unregister-event/volunteer-unregister-event.component'
import { HomepageComponent } from './homepage/homepage.component';
import { CreateOrganizerComponent } from './create-organizer/create-organizer.component';
import { UpdateUserComponent } from './update-user/update-user.component'

const routes: Routes = [
  { path: 'create-event', component: CreateEventComponent },
  { path: 'event-registration', component: EventRegistrationComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signup-volunteer', component: CreateVolunteerComponent },
  { path: 'signup-organiser', component: CreateOrganizerComponent },
  { path: 'volunteer-unregister-event', component: VolunteerUnregisterEventComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'update-user', component: UpdateUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


