import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
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
    alcohol: new FormGroup(
      {
        redWine: new FormControl(false),
        whiteWine: new FormControl(false),
        champagne: new FormControl(false),
        whiskey: new FormControl(false),
        vodka: new FormControl(false),
        no: new FormControl(false),
      },
      Validators.required
    ),
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
    const data = {
      name: this.form.controls.name.value,
      food: this.form.controls.food.value,
      child: this.form.controls.child.value,
      alcohol:
        (this.form.controls.alcohol.controls.redWine.value
          ? ' красное вино,'
          : '') +
        (this.form.controls.alcohol.controls.whiteWine.value
          ? ' белое вино,'
          : '') +
        (this.form.controls.alcohol.controls.champagne.value
          ? ' шампанское,'
          : '') +
        (this.form.controls.alcohol.controls.whiskey.value
          ? ' коньяк/виски, '
          : '') +
        (this.form.controls.alcohol.controls.vodka.value ? ' водка,' : '') +
        (this.form.controls.alcohol.controls.no.value ? 'не пью' : ''),
      message: this.form.controls.message.value,
    };
    this.http.post('https://dorofeev-family.ru/api/send_form', data).subscribe({
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

  checkbox(event: Event) {
    console.log(event.target);
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
