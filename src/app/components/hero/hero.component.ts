import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  weeksLeft = signal(0);
  daysLeft = signal(0);
  hoursLeft = signal(0);
  minutesLeft = signal(0);
  secondsLeft = signal(0);

  constructor() {
    this.calculateTimeLeft();
    setInterval(() => this.calculateTimeLeft(), 1000);
  }

  calculateTimeLeft() {
    const timeLeft = new Date('07/08/2023 17:00').getTime() - new Date().getTime();
    this.weeksLeft.set(Math.floor(timeLeft/(1000*60*60*24*7)));
    this.daysLeft.set(Math.floor(timeLeft/(1000*60*60*24)) - this.weeksLeft()*7);
    this.hoursLeft.set(Math.floor(timeLeft/(1000*60*60)) - (this.weeksLeft()*7 + this.daysLeft())*24);
    this.minutesLeft.set(Math.floor(timeLeft/(1000*60)) - (this.weeksLeft()*7 + this.daysLeft())*24*60 - this.hoursLeft()*60);
    this.secondsLeft.set(Math.floor(timeLeft/1000) - (this.weeksLeft()*7 + this.daysLeft())*24*60*60 - (this.hoursLeft()*60 + this.minutesLeft())*60);
  }
}
