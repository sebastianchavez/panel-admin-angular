import { Injectable } from '@angular/core';
import * as data from './data.json'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IResponse } from '../../models/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  private baseUrl: string = environment.apiUrl
  private url1: string = 'api/templates/get-page'
  private url2: string = 'api/files/update-image'
  private url3: string = 'api/files/update-video'
  private url4: string = 'api/templates/update-page/:page'
  private url5: string = 'api/templates/save-page/:page'

  constructor(
    private http: HttpClient
  ) { }

  getLocalPage(page: 'home' | 'about' | 'services' | 'contact' | 'header' | 'footer' | 'menus'): Promise<any> {
    switch (page) {
      case 'about':
        return Promise.resolve(data.about)
      case 'services':
        return Promise.resolve(data.services)
      case 'contact':
        return Promise.resolve(data.contact)
      case 'home':
        return Promise.resolve(data.home)
      case 'header':
        return Promise.resolve(data.header)
      case 'footer':
        return Promise.resolve(data.footer)
      case 'menus':
        return Promise.resolve(data.menus)
    }
  }

  getPage(page: 'home' | 'about' | 'services' | 'contact' | 'header' | 'footer' | 'menus'): Promise<IResponse> {
    return this.http.get<IResponse>(`${this.baseUrl}${this.url1}?page=${page}`).toPromise()
  }

  updateImage(request: any): Promise<any> {
    return this.http.post(`${this.baseUrl}${this.url2}`, request).toPromise()
  }

  updateVideo(request: any): Promise<any> {
    return this.http.post(`${this.baseUrl}${this.url3}`, request).toPromise()
  }

  updatePage(page: string, request: any): Promise<IResponse> {
    return this.http.put<IResponse>(`${this.baseUrl}${this.url4.replace(':page', page)}`, request).toPromise()
  }

  savePage(page: string, request: any): Promise<IResponse> {
    return this.http.post<IResponse>(`${this.baseUrl}${this.url5.replace(':page', page)}`, request).toPromise()
  }
}
