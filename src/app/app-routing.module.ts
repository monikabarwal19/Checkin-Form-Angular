import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { AddProofComponent } from '../app/Modules/add-proof/add-proof.component';
//import { CheckinFormComponent } from '../app/Modules/checkin-form/checkin-form.component';
//import { ReactiveFormComponent } from '../app/Modules/reactive-form/reactive-form.component';
//import { PreviewCheckinComponent } from '../app/Modules/preview-checkin/preview-checkin.component';
//import { ThanksComponent } from '../app/Modules/thanks/thanks.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', redirectTo: 'checkin', pathMatch:'full'},
  { path: 'checkin', loadChildren: './Modules/checkin-form/checkin-form.module#CheckinFormModule'},
  { path : 'add-proof', loadChildren: './Modules/add-proof/addproof.module#AddproofModule'},
  // { path : 'reactive-form', component: ReactiveFormComponent},
  { path : 'thank-you', loadChildren: './Modules/thanks/thanks.module#ThanksModule'},
  { path:'preview-checkin', loadChildren: './Modules/preview-checkin/preview-checkin.module#PreviewCheckinModule'},
  { path: '**', loadChildren: './Modules/checkin-form/checkin-form.module#CheckinFormModule'},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {useHash : true})
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }