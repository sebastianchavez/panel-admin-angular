import { Component, Input, OnInit } from '@angular/core';
import { IContactPage } from '../../../../models/contact-page.interface';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @Input() contactPage: IContactPage

  constructor() { }

  ngOnInit(): void {
  }

  changeCardHome(ev: any) {
    this.contactPage.title = ev.title
    this.contactPage.description = ev.description
    localStorage.setItem('contactPage', JSON.stringify(this.contactPage))
  }

}
