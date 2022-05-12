import { Component, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IAboutPage } from '../../../../models/about-page.interface';
import { LoggerService } from '../../../../services/logger/logger.service';
import { LandingService } from '../../../../services/landing/landing.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  idLog: string = 'AboutUsComponent'
  @Input() aboutPage: IAboutPage;
  modalRef: BsModalRef;
  edit = {
    text: false
  }
  card = {
    image: '',
    nameImage: '',
    title: '',
    description: ''
  }
  submitted: boolean = false;
  loadImg: boolean = false

  constructor(
    private modalService: BsModalService,
    private logger: LoggerService,
    private landingService: LandingService
  ) { }

  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>) {
    this.card = {
      image: '',
      nameImage: '',
      title: '',
      description: ''
    }
    this.submitted = false
    this.modalRef = this.modalService.show(template);
  }

  changeCard(ev: any, index: number) {
    this.aboutPage.cards[index].text = ev.text
    this.aboutPage.cards[index].image = ev.image
  }

  changeCardTeam(ev: any) {

  }

  changeCardHome(ev: any) {
    this.aboutPage.about.title = ev.title
    localStorage.setItem('aboutPage', JSON.stringify(this.aboutPage))
  }

  editing(value) {
    switch (value) {
      case 'teamTitle':
        this.edit.text = true;
        setTimeout(() => {
          (<HTMLInputElement>document.getElementById('teamTitle')).focus()
        }, 100);
        break;
      default:
        this.edit.text = false
        break;
    }
  }

  deleteTeam(index: number) {
    this.aboutPage.team.splice(index, 1)
  }

  addTeam() {
    this.submitted = true
    if (this.card.image.trim() == '' || this.card.description.trim() == '' || this.card.image == '') {
      return
    }

    this.aboutPage.team.push(this.card)
  }

  onSelectImage(ev: any) {
    try {
      if (ev.target.files && ev.target.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(ev.target.files[0]);
        reader.onload = async (e: any) => {
          const nameImage = Date.now().toString() + '.' + ev.target.files[0].name.split('.')[1];
          this.card.nameImage = nameImage
          const image = e.target.result.split(',')[1].toString();
          const request = {
            image,
            nameImage,
          }
          this.loadImg = true
          const responseS3 = await this.landingService.updateImage(request)
          this.card.image = responseS3.url
          this.loadImg = false
          this.logger.log(this.idLog, 'onSelectImage', { info: 'updateImage Success', response: responseS3 })
        };
      }
    } catch (e) {
      this.loadImg = false
      this.logger.error(this.idLog, 'onSelectImage', { info: 'Error', error: e })
    }
  }
}
