import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from 'src/app/services/dialog.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'invitation',
  standalone: true,
  imports: [CommonModule, DialogComponent],
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvitationComponent {
  constructor(private dialog: DialogService) {}

  showModal() {
    this.dialog.open(DialogComponent);
  }
}
