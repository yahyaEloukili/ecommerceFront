import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  public host: String = "http://localhost:8080"
  constructor(private http: HttpClient) { }

  public getResource(url) {
    return this.http.get(this.host + url);
  }
  public uploadPhoto(currentFileUploaded: any, idProduct): Observable<HttpEvent<{}>> {
    let formData: FormData = new FormData();
    formData.append('file', currentFileUploaded);
    const req = new HttpRequest('POST', this.host + '/uploadedPhoto/' + idProduct, formData, {
      reportProgress: true,
      responseType: 'text',
      //  headers : new HttpHeaders({'Authorization': this.jwtToken})
    })
    return this.http.request(req);
  }
}
