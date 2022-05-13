import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertService } from '../../../../../../../services/alert/alert.service';

@Component({
  selector: 'app-card-about-us-team',
  templateUrl: './card-about-us-team.component.html',
  styleUrls: ['./card-about-us-team.component.scss']
})
export class CardAboutUsTeamComponent implements OnInit {

  @Input() title: string = '';
  @Input() description: string = '';
  @Input() image: string = '';
  @Output() deleteCard: EventEmitter<any> = new EventEmitter();
  edit = {
    image: false,
    title: false,
    description: false
  }
  constructor(
    private alertService: AlertService
  ) { }

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
      default:
        this.edit = {
          image: false,
          title: false,
          description: false
        }
        break;
    }
  }

  async deleteUser() {
    const confirm = await this.alertService.confirm('Desea eliminar este usuario?')
    if (confirm.value) {
      this.deleteCard.emit()
    }
  }
}
