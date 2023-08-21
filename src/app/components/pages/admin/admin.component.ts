import { Component, HostListener, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu/menu.service';
import { LoggerService } from 'src/app/services/logger/logger.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  idLog: string = 'AdminComponent'
  stateSidemenu: boolean = false;
  width = window.innerWidth
  isResponsive: boolean = false

  constructor(
    private menuService: MenuService,
    private logger: LoggerService
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    console.log(event.target.innerWidth);
    if(event.target.innerWidth < 767){
      this.isResponsive = true
    } else {
      this.isResponsive = false
    }
  }

  ngOnInit(): void {
    if(this.width < 767){
      this.isResponsive = true
    } else {
      this.isResponsive = false
    }
    this.menuService.getStateSidemenu().subscribe((res: boolean) => {
      this.stateSidemenu = res
    })
  }

  changeStateSidemenu(ev: boolean) {
    this.menuService.changeStateSidemenu(ev)
  }

}
