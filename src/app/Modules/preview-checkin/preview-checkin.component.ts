import { Component, OnInit } from '@angular/core';
import { PreviewCheckinService } from './preview-checkin.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-preview-checkin',
  templateUrl: './preview-checkin.component.html',
  styleUrls: ['./preview-checkin.component.css']
})
export class PreviewCheckinComponent implements OnInit {
  checkinSubmit:any;
  uploadedFileBase: string ="";
  persons: any;
  termsCheck: boolean = false;
  card1:any;
  card4:any;
  showModal: boolean = false;
  result: string = "";
  constructor(private previewService: PreviewCheckinService,private router: Router) { }

  ngOnInit() {
    this.checkinSubmit = JSON.parse(localStorage.getItem("checkinSubmit"));
    
    this.uploadedFileBase = this.checkinSubmit.tripDetail.persons[0].imagePath;
    this.persons = this.checkinSubmit.tripDetail.persons;    
    if(this.checkinSubmit.tripDetail.paymentDetail.paymentType=="CARD"){
      this.card1=localStorage.getItem("Card1");
      this.card4=localStorage.getItem("Card2");
    }
  }

  // function run on form submission
  previewCheckin(form:any){    
    if(form.termsCheck){
      //this.showModal= true;      
      this.submitForm(this.checkinSubmit);
    }
    else {
      alert("Please read & accepted the Terms & Conditions.");
    }
  }// end

  // function to subscribe preview Form submission
  submitForm(value:any){
    //console.log("value: " + value);
    this.previewService.submitPreviewData(value)
    .subscribe( (response:any)=> 
    {
      // if(response.data.message=="Checkin successfully."){
      //   this.showResponse(true);
      //   //this.showResponse(response); 
      // }
      // else {
      //   this.showResponse(false);
      // }
      console.log(response);
      this.showResponse(response,"success"); 

      // localStorage.clear();
      // this.router.navigate(['/thank-you']);     
    },
    error=>{
      //console.log("error");
      //console.log(error);
      this.showResponse(error.error.message,"error");  
    }
    );
  }//end
  
  showResponse(res,type){
    console.log("showresponse");
    console.log(res);
    //this.result = res;  
    if(type=="success"){  
      if(res.data.message=="Checkin successfully."){
        localStorage.clear();
        this.router.navigate(['/thank-you']); 
      }
      else {
        this.showModal= true;     
        this.result = res.data.message;
      }    
    }
    else if(type=="error"){  
      this.showModal= true;     
      this.result = res;
    }

  }// end showResponse

}
