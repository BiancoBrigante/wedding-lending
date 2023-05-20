import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { InvitationComponent } from './components/invitation/invitation.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { LocationComponent } from './components/location/location.component';

@Component({
  standalone: true,
  imports: [HeroComponent, InvitationComponent, ScheduleComponent, LocationComponent],
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
}
