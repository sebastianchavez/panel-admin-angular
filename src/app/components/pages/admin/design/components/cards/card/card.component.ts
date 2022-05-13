import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() title?: string = '';
  @Input() description?: string = '';
  @Input() btnText?: string = '';
  @Output() editText: EventEmitter<any> = new EventEmitter<any>();
  edit = {
    title: false,
    description: false,
    btn: false
  }

  constructor() { }

  ngOnInit(): void {
  }

  editing(value: any) {
    switch (value) {
      case 'title':
        this.edit.title = true;
        setTimeout(() => {
          (<HTMLInputElement>document.getElementById('title')).focus()
        }, 100);
        break;
      case 'description':
        this.edit.description = true;
        setTimeout(() => {
          (<HTMLInputElement>document.getElementById('description')).focus()
        }, 100);
        break;
      case 'btn':
        this.edit.btn = true;
        setTimeout(() => {
          (<HTMLInputElement>document.getElementById('btn')).focus()
        }, 100);
        break;
      default:
        this.edit = {
          title: false,
          description: false,
          btn: false
        };
        break;
    }
    setTimeout(() => {
      this.editText.emit({ title: this.title, description: this.description, btnText: this.btnText })
    }, 150)
  }

  onClick() {
    this.editing('btn')
  }
}
