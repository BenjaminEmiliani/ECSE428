import { Time } from "@angular/common";
import { Volunteer } from './volunteer';

export class Event {
  public name: string;
  public category: string
  public startDate: Date;
  public startTime: Time;
  public endDate: Date;
  public endTime: Time;
  public volunteers: Volunteer[];
  // public organizer: Organizer[];
}