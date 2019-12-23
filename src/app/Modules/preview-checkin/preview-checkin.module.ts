import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './preview-checkin.routing';
import { FormsModule } from '@angular/forms';
import { PreviewCheckinComponent } from './preview-checkin.component';

@NgModule({
  declarations: [PreviewCheckinComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [PreviewCheckinComponent]
})
export class PreviewCheckinModule { }
