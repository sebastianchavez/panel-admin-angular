import { Component, Input, OnInit } from '@angular/core';
import { IHeader } from '../../../../models/header.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() header: IHeader
  edit = {
    title: false,
    subtitle: false
  }

  constructor(
  ) {
  }

  ngOnInit(): void {
    this.getValues()
  }


  async getValues() {
    setTimeout(() => {
      let video = (<HTMLVideoElement>document.getElementById('headerVideo'))
      if (video && video !== undefined) {
        video.muted = true
        video.play()
      }
    }, 200);
  }


  editing(value) {
    switch (value) {
      case 'title':
        this.edit.title = true;
        setTimeout(() => {
          (<HTMLInputElement>document.getElementById('title')).focus()
        }, 100);
        break;
      case 'subtitle':
        this.edit.subtitle = true;
        setTimeout(() => {
          (<HTMLInputElement>document.getElementById('subtitle')).focus()
        }, 100);
        break;
      default:
        this.edit = {
          title: false,
          subtitle: false
        }
        break;
    }

  }

}
