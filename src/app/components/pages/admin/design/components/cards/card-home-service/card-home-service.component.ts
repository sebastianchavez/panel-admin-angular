import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-home-service',
  templateUrl: './card-home-service.component.html',
  styleUrls: ['./card-home-service.component.scss']
})
export class CardHomeServiceComponent implements OnInit {

  @Input() title: string = '';
  @Input() descriptions: any[] = [];
  @Input() btnText: string = '';
  @Output() editText: EventEmitter<any> = new EventEmitter<any>();
  @Output() deletedCard: EventEmitter<any> = new EventEmitter<any>();
  edit = {
    title: false,
    description: false,
    btn: false
  }

  constructor() { }

  ngOnInit(): void {
  }

  editing(value: string, index?: number) {
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
          (<HTMLInputElement>document.getElementById(`description_${index}`)).focus()
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
        this.formatDescription()
        break;
    }
    setTimeout(() => {
      this.editText.emit({ descriptions: this.descriptions, title: this.title })
    }, 150);
  }

  formatDescription() {
    let descriptionList: any[] = [];
    this.descriptions.forEach((x, i) => {
      if (x.description != '') {
        descriptionList.push(x)
      }
    })
    this.descriptions = descriptionList
    if (this.descriptions.length == 0 && this.title == '') {
      this.deletedCard.emit()
    }
  }

  onClick() {
    this.editing('btn')
  }

  addText() {
    this.descriptions.push({ description: 'Nuevo parrafo...' })
  }
}
