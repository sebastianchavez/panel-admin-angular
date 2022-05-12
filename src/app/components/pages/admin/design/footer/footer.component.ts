import { Component, Input, OnInit } from '@angular/core';
import { IFooter } from '../../../../models/footer.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() footer: IFooter
  edit = {
    text: false
  }

  constructor() { }

  ngOnInit(): void {
  }


  editing(value) {
    switch (value) {
      case 'text':
        this.edit.text = true;
        setTimeout(() => {
          (<HTMLInputElement>document.getElementById('text')).focus()
        }, 100);
        break;
      default:
        this.edit = {
          text: false,
        }
        break;
    }

  }
}
