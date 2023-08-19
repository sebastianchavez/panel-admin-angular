import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() title: string = 'Panel Admin';
  @Input() stateSidemenu: boolean = false;
  @Output() clickStateSidemenu: EventEmitter<any> = new EventEmitter();

  constructor(
    private menuService: MenuService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.menuService.getTitlePage()
      .subscribe(res => {
        this.title = res
      })
  }

  changeStateSidemenu() {
    this.clickStateSidemenu.emit(!this.stateSidemenu)
  }

  onHidden(): void {
    console.log('Dropdown is hidden');
  }
  onShown(): void {
    console.log('Dropdown is shown');
  }
  isOpenChange(): void {
    console.log('Dropdown state is changed');
  }

  logOut(){
    localStorage.clear()
    this.router.navigateByUrl('/login')
  }
}
