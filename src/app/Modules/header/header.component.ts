import { Component, OnInit } from '@angular/core';
import { Subscription, from } from 'rxjs';
import { CheckinformService } from '../checkin-form/checkinform.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  subscription: Subscription;
  hotelName: string = "CheckIn";

  constructor( private CheckinService:CheckinformService) { }

  ngOnInit() { 
    this.subscription = this.CheckinService.getHotelInfo().subscribe(hotelInfo => 
      {
        //console.log(hotelInfo);
        if(hotelInfo){
          this.hotelName = hotelInfo.hotlInfoObjects;
        }
      })
   }

   ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
    }



}
