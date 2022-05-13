import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IServicePage } from '../../../../../../../models/interfaces/service-page.interface';

@Component({
  selector: 'app-card-services',
  templateUrl: './card-services.component.html',
  styleUrls: ['./card-services.component.scss']
})
export class CardServicesComponent implements OnInit {

  @Input() servicesPage?: IServicePage;
  selected?: number;
  formDev = new FormGroup({})
  show: number = 0;
  sections: any[] = [
    {
      text: 'Cuatro',
      value: 4
    },
    {
      text: 'Cinco',
      value: 5
    }
  ]
  types: any[] = [
    {
      text: 'Desarrollo web',
      value: 'WEB'
    },
    {
      text: 'Desarrollo Móvil',
      value: 'MOBILE'
    },
    {
      text: 'Web + App Móvil',
      value: 'WEB_AND_MOBILE'
    },
  ]
  applications: any[] = [
    {
      text: 'Página',
      value: 'LANDING'
    },
    {
      text: 'Tienda online',
      value: 'ECOMMERCE'
    },
  ]
  edit = {
    title: false,
    description: false,
    servicesTitle: false,
    servicesDescription: false,
    servicesFullDescription: false,
    servicesImage: false
  }

  constructor(
  ) { }

  clearFormApp() {
    this.formDev = new FormGroup({

    })
  }

  clearFormDev() {

  }

  ngOnInit(): void {
  }

  showService(number: number) {
    this.show = number
  }

  async onSelectImage(ev: any) {
    try {
      if (ev.target.files && ev.target.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(ev.target.files[0]);
        reader.onload = async (e: any) => {
          const nameImage = Date.now().toString() + '.' + ev.target.files[0].name.split('.')[1];
          const image = e.target.result.split(',')[1].toString();
          const request = {
            image,
            nameImage,
          }
          // TODO: Enviar request a S3

        };
      }
    } catch (e) {
    }
  }

  back() {
    this.show = 0;
  }

  editing(value: any, index?: number) {
    this.selected = index
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
      case 'servicesTitle':
        this.edit.servicesTitle = true;
        setTimeout(() => {
          (<HTMLInputElement>document.getElementById('title_' + index)).focus()
        }, 100);
        break;
      case 'servicesDescription':
        this.edit.servicesDescription = true;
        setTimeout(() => {
          (<HTMLInputElement>document.getElementById('description_' + index)).focus()
        }, 100);
        break;
      case 'servicesFullDescription':
        this.edit.servicesFullDescription = true;
        setTimeout(() => {
          (<HTMLInputElement>document.getElementById('fullDescription_' + index)).focus()
        }, 100);
        break;
      default:
        this.edit = {
          title: false,
          description: false,
          servicesTitle: false,
          servicesDescription: false,
          servicesFullDescription: false,
          servicesImage: false
        }
        break;
    }

  }
}
