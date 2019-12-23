import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './thanks.routing';
import { ThanksComponent } from './thanks.component';

@NgModule({
  declarations: [ThanksComponent],
  imports: [
    CommonModule ,
    RouterModule.forChild(routes)
  ],  
  exports: [ThanksComponent]
})
export class ThanksModule { }
