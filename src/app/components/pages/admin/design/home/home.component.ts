import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IHomePage } from '../../../../models/home-page.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Input() homePage: IHomePage;
  modalRef: BsModalRef;
  card = {
    title: '',
    descriptions: [{
      description: ''
    }],
    router: '',
    btn: ''
  }
  submitted: boolean = false;

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
  }

  changeCardHome(ev: any) {
    this.homePage.about.title = ev.title
    this.homePage.about.description = ev.description
    this.homePage.about.btn = ev.btnText
    localStorage.setItem('homePage', JSON.stringify(this.homePage))
  }

  changeCardService(ev: any, index: number) {
    this.homePage.cards[index].title = ev.title
    this.homePage.cards[index].descriptions = ev.descriptions
    this.homePage.cards[index].btn = ev.btnText
    localStorage.setItem('homePage', JSON.stringify(this.homePage))
  }

  deletedCard(index: number) {
    this.homePage.cards.splice(index, 1)
    localStorage.setItem('homePage', JSON.stringify(this.homePage))
  }

  openModal(template: TemplateRef<any>) {
    this.card = {
      title: '',
      descriptions: [{
        description: ''
      }],
      router: '',
      btn: ''
    }
    this.submitted = false
    this.modalRef = this.modalService.show(template);
  }

  addCard() {

    this.submitted = true
    if (this.card.title == '' || this.card.descriptions[0].description == '') {
      return
    }

    if (this.card.btn !== '') {
      if (this.card.router == '') {
        return
      }
    }

    this.homePage.cards.push(this.card)
    this.modalRef.hide()
  }
}
