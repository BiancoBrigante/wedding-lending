import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogRef } from 'src/app/services/dialog-ref';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

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
  formSubmited = false;
  requestCompletedMessage = '';
  constructor(
    private dialogRef: DialogRef,
    private http: HttpClient,
    private ref: ChangeDetectorRef
  ) {}

  sumbit() {
    this.http
      .post('http://dorofeev-family.ru/api/send_form', this.form.value)
      .subscribe({
        next: () => {
          this.requestCompleted(
            'Подтверждение успешно отправлено! Ждём Вас на нашей свадьбе!'
          );
        },
        error: () =>
          this.requestCompleted(
            'При отправке возникла ошибка. Пожалуйста, попробуйте позже.'
          ),
      });
  }

  requestCompleted(message: string) {
    this.ref.markForCheck();
    this.form.reset();
    this.requestCompletedMessage = message;
    this.formSubmited = true;
    setTimeout(() => this.dialogRef.close(), 2000);
  }

  close() {
    this.dialogRef.close();
  }
}
