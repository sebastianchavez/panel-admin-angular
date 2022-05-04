import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  stateSidemenu: BehaviorSubject<any> = new BehaviorSubject(true);

  constructor() { }

  changeStateSidemenu(state: boolean) {
    this.stateSidemenu.next(state)
  }

  getStateSidemenu() {
    return this.stateSidemenu.asObservable()
  }
}
