import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators'
import { IResponseProject } from '../../models/interfaces/portfolio.interfaces';


@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private userId: string = environment.userId
  private apiPortfolio: string = environment.apiPortfolio
  private url1: string = 'api/projects/get-by-user'
  private url2: string = 'api/projects/update-image'
  private url3: string = 'api/projects/save'
  private url4: string = 'api/projects/delete'
  private url5: string = 'api/projects/update-project'

  constructor(
    private http: HttpClient
  ) { }

  getProyects(limit: number = 10, page: number = 1): Promise<any> {
    return this.http.get<IResponseProject>(`${this.apiPortfolio}${this.url1}?userId=${this.userId}&limit=${limit}&page=${page}`).toPromise()
  }

  updateImage(request: any): Promise<any> {
    return this.http.put(`${this.apiPortfolio}${this.url2}`, request).toPromise()
  }

  createProject(request: any): Promise<any> {
    return this.http.post(`${this.apiPortfolio}${this.url3}`, request).toPromise()
  }

  deleteProject(id: string): Promise<any> {
    return this.http.delete(`${this.apiPortfolio}${this.url4}?id=${id}`).toPromise()
  }

  updateProject(request: any): Promise<any> {
    return this.http.put(`${this.apiPortfolio}${this.url5}`, request).toPromise()
  }
}
