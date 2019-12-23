import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  constructor( private toaster: ToastrService ) {}
    showSucess(msg){
        this.toaster.success( 'Success' ,msg,{ timeOut:2000});
    }
    showWaring(msg){
        this.toaster.warning( 'Warning' , msg ,{ timeOut: 2000});
    }
}
