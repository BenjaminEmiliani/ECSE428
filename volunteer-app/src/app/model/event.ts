import { Time } from "@angular/common";
// import { Volunteer } from './volunteer';
import { Organizer } from './organizer';
import { Task } from './task';

export class Event {
  public name: string;
  public category: string
  public date: Date;
  public startTime: Time;
  public endTime: Time;
  public tasks: Task[];
  public organizer: Organizer;
}