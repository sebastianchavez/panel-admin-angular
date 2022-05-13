import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoggerService } from '../../../../../../../services/logger/logger.service';
import { LandingService } from '../../../../../../../services/landing/landing.service';

@Component({
  selector: 'app-card-about-us',
  templateUrl: './card-about-us.component.html',
  styleUrls: ['./card-about-us.component.scss']
})
export class CardAboutUsComponent implements OnInit {

  idLog: string = 'CardAboutUsComponent'
  @Input() text: string = '';
  @Input() image: string = '';
  @Input() imageName: string = '';
  @Input() position: string = 'left'
  @Output() editText: EventEmitter<any> = new EventEmitter<any>();
  edit = {
    text: false,
    image: false,
  }

  constructor(
    private logger: LoggerService,
    private landingService: LandingService
  ) { }

  ngOnInit(): void {
  }

  editing(value: any) {
    switch (value) {
      case 'text':
        this.edit.text = true;
        setTimeout(() => {
          (<HTMLInputElement>document.getElementById('text')).focus()
        }, 100);
        break;
      case 'text2':
        this.edit.text = true;
        setTimeout(() => {
          (<HTMLInputElement>document.getElementById('text2')).focus()
        }, 100);
        break;
      default:
        this.edit.text = false
        break;
    }
    setTimeout(() => {
      this.editText.emit({ text: this.text, image: this.image, imageName: this.imageName })
    }, 150);
  }

  onSelectImage(ev: any) {
    try {
      if (ev.target.files && ev.target.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(ev.target.files[0]);
        reader.onload = async (e: any) => {
          const nameImage = Date.now().toString() + '.' + ev.target.files[0].name.split('.')[1];
          this.imageName = nameImage
          const image = e.target.result.split(',')[1].toString();
          const request = {
            document: image,
            nameDocument: nameImage,
          }
          this.edit.image = true
          const responseS3 = await this.landingService.updateImage(request)
          this.image = responseS3.url
          this.edit.image = false
          setTimeout(() => {
            this.editText.emit({ text: this.text, image: this.image, imageName: this.imageName })
          }, 150);
          this.logger.log(this.idLog, 'onSelectImage', { info: 'updateImage Success', response: responseS3 })
        };
      }
    } catch (e) {
      this.edit.image = false
      this.logger.error(this.idLog, 'onSelectImage', { info: 'Error', error: e })
    }
  }
}
