import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MicroservicesService {

  private apiEmail: string = environment.apiEmail
  private apiS3: string = environment.apiS3
  private apiPushnotification: string = environment.apiPushnotification

  constructor(
    private http: HttpClient
  ) { }

  healthEmail(): Promise<any> {
    return this.http.get(`${this.apiEmail}v1/health`).toPromise()
  }

  healthS3(): Promise<any> {
    return this.http.get(`${this.apiS3}v1/health`).toPromise()
  }

  healthPushnotification(): Promise<any> {
    return this.http.get(`${this.apiPushnotification}v1/health`).toPromise()
  }
}
