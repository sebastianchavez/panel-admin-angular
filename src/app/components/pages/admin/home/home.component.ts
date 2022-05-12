import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../../models/interfaces/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user?: IUser;
  constructor() { }

  ngOnInit(): void {
    this.getValues()
  }

  getValues() {
    // this.user = JSON.parse(localStorage.getItem('currentUser')!)
  }

}
