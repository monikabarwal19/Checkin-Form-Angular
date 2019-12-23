import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { CheckinformService } from './checkinform.service';
import { DatepickerOptions } from 'ng2-datepicker';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-checkin-form',
  templateUrl: './checkin-form.component.html',
  styleUrls: ['./checkin-form.component.css']
})
export class CheckinFormComponent implements OnInit, OnDestroy {
  checkin: any = [];
  errorStatus:boolean= false;
  errorText:string="";
  param:string="";
  getAppUrl: string = "";
  refNumber: string = "";
  hotelId:string = "";
  travelAgentName: string = "";
  travelAgentId: string = "";
  nextDestination: string = "";
  arrivedFrom: string = "";
  travelAgent: any = [];
  pickDropArrival: string = 'false';
  pickDropDeparture: string = 'false';
  paymentType : string; // variable which is false when paymentType is CASH & true when Credit card.
  paymentMode : string;
  noOfRoom: number;
  noOfPersons: number;
  maxPerson : number;
  minPerson : number;
  arrivalDetail:string = "";
  departureDetail:string = "";
  cardNumber1:string = "";
  cardNumber2:string = "";
  cardNumber3:string = "";
  cardNumber4:string = "";
  visitRadio : String = "business";
  showApp:boolean = false;

  personDetail: any = ''; //variable which hold localStorage personDetail
  checkinSubmit = {
        "tripDetail": {
            "purposeOfVisit":"business",
            "departureTime": "",
            "pickupDropDeparture": false,
            "hotelId": "",
            "pickupDropArrival": false,
            "arrivalDate": "",
            "persons": [{}],
            "pickupDropLocationArrival": "",
            "pickupDropLocationDeparture": "",
            "paymentDetail": {
                "cardHolderName": "",
                "expiryMonth": "",
                "expiryYear": "",
                "cardNumber": "",
                "paymentType": ""
            },
            "refNumber": "",
            "noOfPerson": 1,
            "arrivalTime": "",
            "travelAgent": "",
            "nextDestination": "",
            "arrivedFrom": "",
            "departureDate": "",
            "noOfRooms": 1
        }
    }

  // for calender date setup
 arrivalDate: string = "";
 arrivalTime: string = "";
 currentD = new Date().getDate();
 currentY = new Date().getFullYear();
 currentM = new Date().getMonth() + 1;
 lastY = new Date().getFullYear() + 1;
 options: DatepickerOptions = {
   minYear: new Date().getFullYear(),
   maxYear: 2030,
   displayFormat: 'MMM D[,] YYYY',
   barTitleFormat: 'MMMM YYYY',
   dayNamesFormat: 'dd',
   firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
   //locale: frLocale,
   minDate: new Date(this.currentM + '/' + this.currentD + '/' + this.currentY), // Minimal selectable date
   maxDate: new Date(this.currentM + '/' + this.currentD + '/' + this.lastY),  // Maximal selectable date
   barTitleIfEmpty: 'Date',
   placeholder: 'Date', // HTML input placeholder attribute (default: '')
   addClass: 'form-control', // Optional, value to pass on to [ngClass] on the input field
   addStyle: {}, // Optional, value to pass to [ngStyle] on the input field
   fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
   useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown
 };

  // for calender departure date setup
  departureDate: string = "";
  departureTime: string ="";
  currentDD = new Date().getDate();
  currentDY = new Date().getFullYear();
  currentDM = new Date().getMonth() + 1;
  lastDY = new Date().getFullYear() + 1;
  dOption: DatepickerOptions = {
    minYear: new Date().getFullYear(),
    maxYear: 2030,
    displayFormat: 'MMM D[,] YYYY',
    barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'dd',
    firstCalendarDay: 0, 
    minDate: new Date(this.currentDM + '/' + this.currentDD + '/' + this.currentDY), 
    maxDate: new Date(this.currentDM + '/' + this.currentDD + '/' + this.lastDY),  
    barTitleIfEmpty: 'Date',
    placeholder: 'Date', 
    addClass: 'form-control', 
    addStyle: {}, 
    fieldId: 'date-picker-deptarture', 
    useEmptyBarTitle: false, 
  };
  
  constructor(private route: ActivatedRoute,private CheckinService: CheckinformService,private renderer: Renderer2,
    private atp: AmazingTimePickerService, private router : Router) { }
  // open() is used for timer
  open() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => { });
  }
  ngOnInit() { 
    //this.router.navigate(['thank-you']);
    this.param = this.route.snapshot.queryParamMap.get("param");
    //this.param = "8b1839db6dc4cfaeb23031e6fde3b2890d54d2506186d4";
    //console.log(this.param);
    this.getAppUrl = `https://chkinn.birdapps.org/NLtk?type=1&6param=${this.param}`;
    this.hideApp();     

    if((localStorage.getItem("noOfPerson")=="NaN") || (localStorage.getItem("noOfPerson")==null) || !(localStorage.getItem("noOfPerson")) ){      
      localStorage.setItem("noOfPerson",""); 
    }
    if((localStorage.getItem("personsDetail"))){
      this.personDetail = JSON.parse(localStorage.getItem("personsDetail"));
    }
    this.displayCheckinData();
    this.displayAgentData();
  }


  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'getAppAdd');
  }


  // function used to show hide Get App icon
  hideApp(){
    if(window.innerWidth < 768){
      this.showApp = true;
      this.renderer.addClass(document.body, 'getAppAdd');
    }
  }
  closeGetApp(){
    this.showApp = false;
    this.renderer.removeClass(document.body, 'getAppAdd');
  }
  
  dateChange(value){
    var date1 = new Date(value);
    this.changeDepartureDate(date1); 
  }
  changeDepartureDate(value)
  {
    value.setDate((value.getDate() + 1));
    this.dOption.minDate=value;
    this.departureDate= value.toDateString();
  }

  displayCheckinData(){
  //console.log("kiran");
    this.CheckinService.fetchCheckinData(this.param)
      .subscribe( (response: any) => { 
        let currentDate = new Date();
        let compareArrivalD = new Date(response.data.tripDetail.arrivalDate);
        if(compareArrivalD < currentDate){
          this.errorStatus = true;
          this.errorText = "Sorry! Check-In date is passed";
          return;
        }
        this.setResponse(response);
      },
      error=> {
        this.errorStatus = true;
        // console.log("error.message");
        // console.log(error.error.message);
        this.errorText = error.error.message;
      }
      )
  }

  setResponse(response: any) {    
    let bId = localStorage.getItem("bookingId");        
    this.checkin = response.data;
    this.refNumber = this.checkin.tripDetail.refNumber;
    if(bId!=this.refNumber || localStorage.getItem("noOfPerson")==""){
      localStorage.setItem("bookingId",this.refNumber);
      this.noOfPersons = response.data.tripDetail.noOfPerson;  
      this.noOfRoom = response.data.tripDetail.noOfRooms;
      localStorage.removeItem("personsDetail");
    }
    else {          
      this.noOfPersons = parseInt(localStorage.getItem("noOfPerson"));
      this.noOfRoom = parseInt(localStorage.getItem("noOfRoom"));
    }    
    this.travelAgentName =this.checkin.tripDetail.travelAgentName;
    this.travelAgentId = this.checkin.tripDetail.travelAgent;
    this.arrivedFrom =this.checkin.tripDetail.arrivedFrom;
    this.nextDestination =this.checkin.tripDetail.nextDestination;
    this.pickDropArrival = (response.data.tripDetail.pickupDropArrival).toString();
    this.pickDropDeparture = (response.data.tripDetail.pickupDropDeparture).toString();
    this.paymentMode = response.data.tripDetail.paymentType; 
    this.hotelId = response.data.hotlInfoObjects.id; 

    this.CheckinService.sendHotelInfo(response.data.hotlInfoObjects.hotelName);        
    if(this.paymentMode=="CASH"){
      this.paymentType = "false";
    }
    else {
      this.paymentType = "true";
    }          
    this.arrivalDate = (response.data.tripDetail.arrivalDate).toString();
    
    this.arrivalTime = (response.data.tripDetail.arrivalTime).toString();
    this.departureDate = (response.data.tripDetail.departureDate).toString();
    this.departureTime = (response.data.tripDetail.departureTime).toString();
  }

  // function show dropdown data
  displayAgentData(){
    this.CheckinService.fetchAgentData()
      .subscribe( (response: any) => { 
        this.travelAgent = response.data;
      })
  }

  // function which count+increment+decrement of room/person
  countRoom(inputValue,performAction,inputType){    
    if(inputType=="room"){
      if(performAction=="minus" && inputValue > 1){
        inputValue--; 
        this.noOfRoom = inputValue;
        if(!(inputValue*4>=this.noOfPersons))
        {
          this.noOfPersons=inputValue*4;
        }
      }
       else if(performAction=="plus"){
        inputValue++;
        this.noOfRoom = inputValue;
        if(this.noOfPersons<this.noOfRoom) {
          this.noOfPersons=this.noOfRoom;
        }
      }
      localStorage.setItem("noOfRoom",this.noOfRoom.toString()); 
    }
    else if(inputType=="person") {
      if(performAction=="minus" && inputValue > 1){
        if(this.noOfPersons>this.noOfRoom)
        {
          inputValue--; 
          this.noOfPersons=inputValue;
        }
      }
       else if(performAction=="plus"){
        if((inputValue+1)/4<=this.noOfRoom)
        {
          inputValue++;
          this.noOfPersons = inputValue;
        }      
      }
      localStorage.setItem("noOfPerson",this.noOfPersons.toString());    
    }     
  }
  
  // function run on Add-proof button click
  addProof(personCount,roomCount){
    personCount = parseInt(personCount);
    localStorage.setItem("noOfPerson",personCount);    
    localStorage.setItem("noOfRoom",roomCount);
    this.router.navigate(['/add-proof'], { queryParams: { param: this.param } });
  }//end

// FUNCTION RUN ON SAVE & NEXT BUTTON
previewForm(formValue:any){
  //console.log("this.personDetail==[]: "+ (angular.equals({}, this.personDetail)));
    // if(this.personDetail==[]){
    //   alert("Please Add peron Id Proof");
    //   return;
    // }
    if(this.paymentType=="true"){
      this.paymentMode = "CASH";
    }
    else {
      this.paymentMode = "CARD";
    }
    var dDate = new Date(formValue.departureDate);
    var aDate = new Date(formValue.arrivalDate);
    let cardNumber = formValue.cardNumber1+"-"+formValue.cardNumber2+"-"+formValue.cardNumber3+"-"+formValue.cardNumber4;
    this.checkinSubmit = {
          "tripDetail": {
              "purposeOfVisit":formValue.visitRadio,
              "departureTime": formValue.departureTime,
              "pickupDropDeparture": JSON.parse(formValue.pickupDropDeparture),
              "hotelId": this.hotelId,
              "pickupDropArrival": JSON.parse(formValue.pickupDropArrival),
              "arrivalDate": aDate.getFullYear()+"-"+(aDate.getMonth()+1)+"-"+aDate.getDate(),
              "persons": this.personDetail,
              "pickupDropLocationArrival": formValue.arrivalDetail,
              "pickupDropLocationDeparture": formValue.departureDetail,
              "paymentDetail": {
                  "cardHolderName": "",
                  "expiryMonth": "",
                  "expiryYear": "",
                  "cardNumber": cardNumber,
                  "paymentType": this.paymentMode
              },
              "refNumber": formValue.refNumber,
              "noOfPerson": parseInt(formValue.noOfPerson),
              "arrivalTime": formValue.arrivalTime,
              "travelAgent": formValue.travelAgentId,
              "nextDestination": formValue.nextDestination,
              "arrivedFrom": formValue.arrivedFrom,
              "departureDate": dDate.getFullYear()+"-"+(dDate.getMonth()+1)+"-"+dDate.getDate(),
              "noOfRooms": parseInt(formValue.noOfRoom)
          }
      }
      //end checkinSubmit
      localStorage.setItem("checkinSubmit",JSON.stringify(this.checkinSubmit));
      if(cardNumber!=" " || cardNumber!= undefined || cardNumber!=null){
        localStorage.setItem("Card1",formValue.cardNumber1);
        localStorage.setItem("Card2",formValue.cardNumber2);
      }
      this.router.navigate(['preview-checkin'], { queryParams: { param: this.param } });
}//end

}
