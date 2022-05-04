import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() title: string = 'Nombre página';
  @Input() stateSidemenu: boolean = false;
  @Output() clickStateSidemenu: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  changeStateSidemenu() {
    this.clickStateSidemenu.emit(!this.stateSidemenu)
  }

}
