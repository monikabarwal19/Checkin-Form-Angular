import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { NgDatepickerModule } from 'ng2-datepicker';
//import { AmazingTimePickerModule } from 'amazing-time-picker';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { HeaderComponent } from '../app/Modules/header/header.component';
import { FooterComponent } from '../app/Modules/footer/footer.component';
import { CheckinformService } from '../app/Modules/checkin-form/checkinform.service';
import { from } from 'rxjs';
// import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
//import { PreviewCheckinComponent } from '../app/Modules/preview-checkin/preview-checkin.component';
import { ToasterService } from './helper/toaster.service';
//import { RouterModule, Routes } from '@angular/router';

// import { AddProofComponent } from '../app/Modules/add-proof/add-proof.component';
//import { CheckinFormComponent } from '../app/Modules/checkin-form/checkin-form.component';
// import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
//import { ThanksComponent } from '../app/Modules/thanks/thanks.component';
// import { PreviewCheckinComponent } from './preview-checkin/preview-checkin.component';

@NgModule({
  declarations: [
    AppComponent,    
    HeaderComponent,
    FooterComponent,
    // routingComponents,
    //PreviewCheckinComponent,
    // AddProofComponent,
    //CheckinFormComponent,
    //ReactiveFormComponent,
    //ThanksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    //RouterModule.forRoot(Routes),

    FormsModule,
    ReactiveFormsModule,
    // NgDatepickerModule,
    //AmazingTimePickerModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [
    CheckinformService,
    ToasterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
