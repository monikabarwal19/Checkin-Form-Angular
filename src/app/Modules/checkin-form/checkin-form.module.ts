import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './checkin-form.routing';
import { CheckinFormComponent } from './checkin-form.component';
import { FormsModule } from '@angular/forms';
import { NgDatepickerModule } from 'ng2-datepicker';
import { AmazingTimePickerModule } from 'amazing-time-picker';

@NgModule({
  declarations: [CheckinFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgDatepickerModule,
    AmazingTimePickerModule,
    RouterModule.forChild(routes)
  ],
  exports: [CheckinFormComponent]
})
export class CheckinFormModule { }
