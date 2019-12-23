import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddProofService {
  uploadApiUrl = `${environment.baseApiURL}checkin/uploadMedia`;

  constructor(private http: HttpClient) {}


  uploadImgCall(formData)  {
  return this.http.post(this.uploadApiUrl, formData);
  };
  
}
