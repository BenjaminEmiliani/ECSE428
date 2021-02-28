import { Time } from "@angular/common";
import { Organizer } from './organizer';
import { Task } from './task';
import { Volunteer } from './volunteer';

export class Event {
  public name: string;
  public category: string
  public date: Date;
  public startTime: Time;
  public endTime: Time;
  public volunteers: Volunteer[];
  public tasks: Task[];
  public organizer: Organizer;
}