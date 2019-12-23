import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreviewCheckinService {
  previewSubmitUrl = `${environment.baseApiURL}checkin/saveDetailWithReferenceId`;

  constructor(private http: HttpClient) { }

  submitPreviewData(formData1) : Observable<any[]>{
    return this.http.post<any[]>(this.previewSubmitUrl,formData1);
  }
  

}
