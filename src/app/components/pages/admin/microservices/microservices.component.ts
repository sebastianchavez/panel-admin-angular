import { Component, OnDestroy, OnInit } from '@angular/core';
import { MicroservicesService } from '../../../../services/microservices/microservices.service';
import { LoggerService } from '../../../../services/logger/logger.service';

@Component({
  selector: 'app-microservices',
  templateUrl: './microservices.component.html',
  styleUrls: ['./microservices.component.scss']
})
export class MicroservicesComponent implements OnInit, OnDestroy {

  idLog: string = 'MicroservicesComponent'

  interval: any;
  services: any[] = [
    {
      service: 'Email',
      state: false,
      description: 'Microservicio para envio de email para aplicaciones',
      error: ''
    },
    {
      service: 'S3',
      state: false,
      description: 'Microservicio para subida a buckets s3',
      error: ''
    },
    {
      service: 'Push notification',
      state: false,
      description: 'Microservicio para envio de notificaciones push con one signal',
      error: ''
    }
  ]
  constructor(
    private microservicesService: MicroservicesService,
    private logger: LoggerService
  ) { }

  ngOnInit(): void {
    this.checkEmail()
    this.checkS3()
    this.checkPushNotification()
    this.interval = setInterval(() => {
      this.checkEmail()
      this.checkS3()
      this.checkPushNotification()
    }, 10000)
  }

  async checkEmail() {
    try {
      const response = await this.microservicesService.healthEmail()
      this.services[0].state = true
      this.logger.log(this.idLog, 'checkEmail', { info: 'Success', response })
    } catch (error: any) {
      this.services[0].state = false
      this.services[0].error = error.message
      this.logger.error(this.idLog, 'checkEmail', { info: 'Error', error })
    }
  }

  async checkS3() {
    try {
      const response = await this.microservicesService.healthS3()
      this.services[1].state = true
      this.logger.log(this.idLog, 'checkS3', { info: 'Success', response })
    } catch (error: any) {
      this.services[1].state = false
      this.services[1].error = error.message
      this.logger.error(this.idLog, 'checkS3', { info: 'Error', error })
    }
  }

  async checkPushNotification() {
    try {
      const response = await this.microservicesService.healthPushnotification()
      this.services[2].state = true
      this.logger.log(this.idLog, 'checkPushNotification', { info: 'Success', response })
    } catch (error: any) {
      this.services[2].state = false
      this.services[2].error = error.message
      this.logger.error(this.idLog, 'checkPushNotification', { info: 'Error', error })
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.interval)
  }
}
