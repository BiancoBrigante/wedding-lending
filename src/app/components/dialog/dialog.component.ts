import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogRef } from 'src/app/services/dialog-ref';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'wedding-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  readonly form = new FormGroup({
    name: new FormControl('', Validators.required),
    food: new FormControl('', Validators.required),
    child: new FormControl('', Validators.required),
    alcohol: new FormControl('', Validators.required),
    message: new FormControl(''),
  });
  constructor(private dialogRef: DialogRef) {}

  sumbit() {
    console.log(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
