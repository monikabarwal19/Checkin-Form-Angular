import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, from, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CheckinformService {  
  //e88d856b5394c4cbb5869673600fcda72af5df9014067d
 
  fetchAgentUrl = `${environment.baseApiURL}bookingSource/listing`; 
  fetchCheckinUrl; 

  constructor(private http: HttpClient) { }
  private subject = new Subject<any>();

  fetchCheckinData(paramValue) : Observable<any[]>{
     this.fetchCheckinUrl = `${environment.baseApiURL}checkin/encReferenceData?param=${paramValue}`;
    return this.http.get<any[]>(this.fetchCheckinUrl);
  }

  fetchAgentData() : Observable<any[]>{
    return this.http.get<any[]>(this.fetchAgentUrl);
  }

  sendHotelInfo(hotelInfo:any){
    this.subject.next({hotlInfoObjects:hotelInfo});
  }

  getHotelInfo() : Observable<any> {
    return this.subject.asObservable();
  }

}
