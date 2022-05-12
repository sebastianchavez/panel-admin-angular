import { Component, OnInit } from '@angular/core';
import { IMenuDesign } from '../../../models/menus.interface';
import { IHomePage } from '../../../models/home-page.interface';
import { LandingService } from '../../../services/landing/landing.service';
import { IAboutPage } from '../../../models/about-page.interface';
import { IServicePage } from '../../../models/service-page.interface';
import { IContactPage } from '../../../models/contact-page.interface';
import { IHeader } from '../../../models/header.interface';
import { IFooter } from '../../../models/footer.interface';
import { LoggerService } from '../../../services/logger/logger.service';
import { AlertService } from '../../../services/alert/alert.service';
import { IResponse } from '../../../models/response.interface';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit {

  idLog: string = 'DesignComponent'
  menus: IMenuDesign[] = [
    { text: 'Home', router: 'home' },
    { text: '¿Quienes somos?', router: 'about' },
    { text: 'Servicios', router: 'services' },
    { text: 'Contactanos', router: 'contacts' },
    { text: 'Header', router: 'header' },
    { text: 'Footer', router: 'footer' }
  ]
  selected: number;
  homePage: IHomePage;
  aboutPage: IAboutPage;
  servicesPage: IServicePage;
  contactPage: IContactPage
  header: IHeader;
  footer: IFooter;
  updatePages = {
    about: false,
    home: false,
    service: false,
    contact: false,
    header: false,
    footer: false
  }


  constructor(
    private landingService: LandingService,
    private alertService: AlertService,
    private logger: LoggerService
  ) { }

  ngOnInit(): void {
    this.selectPage(0)
  }

  selectPage(index: number) {
    this.selected = index
    switch (index) {
      case 0:
        this.getPage('home')
        break
      case 1:
        this.getPage('about')
        break
      case 2:
        this.getPage('services')
        break
      case 3:
        this.getPage('contact')
        break
      case 4:
        this.getPage('header')
        break
      case 5:
        this.getPage('footer')
        break
    }
  }

  async getPage(page: 'home' | 'about' | 'services' | 'contact' | 'header' | 'footer' | 'menus') {
    let localData
    try {
      let response: IResponse
      response = await this.landingService.getPage(page)
      if (response.data) {
        this.setPage(page, response.data, true)
      } else {
        localData = await this.landingService.getLocalPage(page)
        this.setPage(page, localData)
      }
      this.logger.log(this.idLog, 'getPage', { info: 'Success', response })
    } catch (e) {
      localData = await this.landingService.getLocalPage(page)
      this.setPage(page, localData)
      this.logger.error(this.idLog, 'getPage', { info: 'Error', error: e })
    }
  }

  setPage(page: 'home' | 'about' | 'services' | 'contact' | 'header' | 'footer' | 'menus', data: any, update = false) {
    switch (page) {
      case 'home':
        this.updatePages.home = update
        this.homePage = data
        break
      case 'about':
        this.updatePages.about = update
        this.aboutPage = data
        break
      case 'services':
        this.updatePages.service = update
        this.servicesPage = data
        break
      case 'contact':
        this.updatePages.contact = update
        this.contactPage = data
        break
      case 'header':
        this.updatePages.header = update
        this.header = data
        break
      case 'footer':
        this.updatePages.footer = update
        this.footer = data
        break
      case 'menus':
        this.menus = data
        break
    }
  }

  async saveChangePage(page: 'home' | 'about' | 'services' | 'contact' | 'header' | 'footer') {
    try {
      let response
      switch (page) {
        case 'home':
          if (this.updatePages.home) {
            response = await this.landingService.updatePage(page, this.homePage)
          } else {
            response = await this.landingService.savePage(page, this.homePage)
            this.updatePages.home = true
          }
          break;
        case 'about':
          if (this.updatePages.about) {
            response = await this.landingService.updatePage(page, this.aboutPage)
          } else {
            response = await this.landingService.savePage(page, this.aboutPage)
            this.updatePages.about = true
          }
          break;
        case 'services':
          if (this.updatePages.service) {
            response = await this.landingService.updatePage(page, this.servicesPage)
          } else {
            response = await this.landingService.savePage(page, this.servicesPage)
            this.updatePages.service = true
          }
          break;
        case 'contact':
          if (this.updatePages.contact) {
            response = await this.landingService.updatePage(page, this.contactPage)
          } else {
            response = await this.landingService.savePage(page, this.contactPage)
            this.updatePages.contact = true
          }
          break;
        case 'header':
          if (this.updatePages.header) {
            response = await this.landingService.updatePage(page, this.header)
          } else {
            response = await this.landingService.savePage(page, this.header)
            this.updatePages.header = true
          }
          break;
        case 'footer':
          if (this.updatePages.footer) {
            response = await this.landingService.updatePage(page, this.footer)
          } else {
            response = await this.landingService.savePage(page, this.footer)
            this.updatePages.footer = true
          }
          break;
      }
      this.alertService.toast('Cambios guardados con éxito')
      this.logger.log(this.idLog, 'saveChangePage', { info: 'Success', response, updatePages: this.updatePages })
    } catch (e) {
      const msg = e.error && e.error.message ? e.error.message : 'Problemas al guardar cambios, por favor intente más tarde'
      this.alertService.alert(msg)
      this.logger.error(this.idLog, 'saveChangePage', { info: 'Error', error: e, updatePages: this.updatePages })
    }
  }
}
