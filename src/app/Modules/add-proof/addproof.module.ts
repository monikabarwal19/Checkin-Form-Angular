import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProofComponent } from './add-proof.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'
import { routes } from './add-proof.routing';

@NgModule({
  declarations: [AddProofComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports:[AddProofComponent]
})
export class AddproofModule { }
