import { Component, OnInit, TemplateRef } from '@angular/core';
import { PortfolioService } from '../../../../services/portfolio/portfolio.service';
import { LoggerService } from '../../../../services/logger/logger.service';
import { IProject } from '../../../../models/interfaces/portfolio.interfaces';
import { Portfolio } from '../../../../models/classes/portfolio.class';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { technologies } from '../../../../config/technologies';
import { limits } from '../../../../config/limits';
import { AlertService } from '../../../../services/alert/alert.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  idLog: string = 'PortfolioComponent'
  projects: Portfolio[] = [];
  maxSize = 5;
  bigTotalItems = 50;
  bigCurrentPage = 1;
  limit = 0
  page = 1
  limits = limits
  imgModal: any

  modalRef?: BsModalRef;
  portfolioForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  btnLoad: boolean = false;
  links: any[] = []
  myTechnologies: any[] = []
  images: any[] = []
  technologies = technologies;
  loadImage: boolean = false;
  isUpdate: boolean = false;
  project: any = {};
  imgSelected: number = 0;

  constructor(
    private portfolioService: PortfolioService,
    private logger: LoggerService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private alertService: AlertService
  ) { }

  get f() { return this.portfolioForm.controls; }

  ngOnInit(): void {
    this.clearForm()
    this.getMyPortfolio()
  }

  clearForm() {
    this.submitted = false
    this.myTechnologies = [];
    this.images = [];
    this.links = [];
    this.portfolioForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      links: [[]],
      category: ['', [Validators.required]],
      technology: [''],
      color: ['primary'],
      technologies: [[]],
      images: [[]],
      inStore: [false]
    });
  }

  openModal(template: TemplateRef<any>) {
    this.isUpdate = false
    this.clearForm()
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  openModalView(template: TemplateRef<any>, data: any) {
    this.project = data;
    this.imgSelected = 0;
    this.modalRef = this.modalService.show(template)
  }

  openModalEdit(template: TemplateRef<any>, data: any) {
    this.isUpdate = true
    this.portfolioForm.setValue({
      title: data.title,
      description: data.description,
      links: data.links,
      category: data.category,
      technologies: data.technologies,
      images: data.images,
      inStore: data.inStore ? data.inStore : false,
      technology: '',
      color: 'primary'
    })
    console.log({ data })
    this.project._id = data._id
    this.myTechnologies = Object.assign([...data.technologies]);
    this.images = Object.assign([...data.images]);
    this.links = Object.assign([...data.links]);
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' })
  }

  selectImg(num: number) {
    console.log({ num, suma: this.imgSelected + num, length: this.project.images.length })
    if ((this.imgSelected + num) >= 0 && (this.imgSelected + num) < this.project.images.length) {
      this.imgSelected += num;
    }
  }

  async getMyPortfolio() {
    try {
      const response = await this.portfolioService.getProyects(this.limit, this.page)
      this.projects = response.projects;
      this.bigTotalItems = response.countProjects
      this.logger.info(this.idLog, 'getMyPortfolio', { info: 'Success', response, bigTotalItems: this.bigTotalItems })
    } catch (error) {
      this.logger.error(this.idLog, 'getMyPortfolio', { info: 'Error', error })
    }
  }


  pageChanged(event: any): void {
    this.bigCurrentPage = event.page;
    this.page = event.page;
    this.getMyPortfolio();
  }

  addLink() {
    const link = {
      name: (<HTMLInputElement>document.getElementById('nameLink')).value,
      url: (<HTMLInputElement>document.getElementById('url')).value
    }
    this.links.push(link);
    this.portfolioForm.controls.links.setValue(this.links);
    (<HTMLInputElement>document.getElementById('nameLink')).value = '';
    (<HTMLInputElement>document.getElementById('url')).value = '';
  }

  addTechnology() {
    const title = this.portfolioForm.controls.technology.value
    const color = this.portfolioForm.controls.color.value
    const technology = {
      title,
      color
    }
    this.myTechnologies.push(technology)
    this.portfolioForm.controls.technologies.setValue(this.myTechnologies)
    this.portfolioForm.controls.technology.setValue('')
    this.portfolioForm.controls.color.setValue('')
  }

  onSelectImage(ev: any) {
    try {
      if (ev.target.files && ev.target.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(ev.target.files[0]);
        reader.onload = async (e: any) => {
          const arrImg = ev.target.files[0].name.split('.')
          const nameImage = Date.now().toString() + '.' + arrImg[arrImg.length - 1];
          const image = e.target.result.split(',')[1].toString();
          const request = {
            image,
            nameImage,
          }
          this.loadImage = true
          const response = await this.portfolioService.updateImage(request)
          const newImage = {
            image: response.url,
            imageName: nameImage
          }
          this.images.push(newImage)
          this.portfolioForm.controls.images.setValue(this.images)
          this.alertService.toast('Imagen cargada')
          this.logger.log(this.idLog, 'onSelectImage', { info: 'Success', response })
        };
      }
    } catch (error: any) {
      const msg = error.error && error.error.message ? error.error.message : 'Problemas al guardar imagen, por favor intente más tarde'
      this.alertService.alert(msg, 'error')
      this.logger.error(this.idLog, 'onSelectImage', { info: 'Error', error })
    }
    this.loadImage = false
  }

  openImage(i: any) {
    this.imgModal = i;
    const modal = (<HTMLInputElement>document.getElementById('myModal'));
    modal.style.display = 'block';
    modal.style.zIndex = '99999';

    const span = document.getElementsByClassName(
      'modal-img-close'
    )[0] as HTMLInputElement;

    span.onclick = function () {
      modal.style.display = 'none';
    };
  }

  async onSubmit(values: any) {

    this.submitted = true

    if (!this.portfolioForm.valid) {
      return
    }

    this.btnLoad = true

    try {
      let response
      if (this.isUpdate) {
        response = await this.portfolioService.updateProject({ ...values, _id: this.project._id })
      } else {
        response = await this.portfolioService.createProject(values)
      }
      this.modalRef?.hide()
      this.logger.log(this.idLog, 'onSubmit', { info: 'Success', response })
      this.getMyPortfolio()
      this.alertService.toast(`Proyecto ${this.isUpdate ? 'actualizado' : 'agregado'} con éxito`)
    } catch (error: any) {
      const msg = error.error && error.error.message ? error.error.message : 'Problemas al guardar proyecto, por favor intente más tarde'
      this.alertService.alert(msg, 'error')
      this.logger.error(this.idLog, 'onSubmit', { info: 'Error', error })
    }

    this.btnLoad = false;
  }

  async deleteImage(i: number) {
    const confirm = await this.alertService.confirm('Desea eliminar esta imágen?', 'question', 'Si', 'No')
    if (confirm.value) {
      this.images.splice(i, 1)
      this.portfolioForm.controls.images.setValue(this.images)
    }
  }

  async deleteLink(i: number) {
    const confirm = await this.alertService.confirm('Desea eliminar este link?', 'question', 'Si', 'No')
    if (confirm.value) {
      this.links.splice(i, 1)
      this.portfolioForm.controls.links.setValue(this.links)
    }
  }

  async deleteTechnology(i: number) {
    const confirm = await this.alertService.confirm('Desea eliminar esta tecnología?', 'question', 'Si', 'No')
    if (confirm.value) {
      this.myTechnologies.splice(i, 1)
      this.portfolioForm.controls.technologies.setValue(this.myTechnologies)
    }
  }

  async deleteProject(id: string, index: number) {
    try {
      const confirm = await this.alertService.confirm('Desea eliminar este proyecto?', 'question', 'Si', 'No')
      if (confirm.value) {
        const response = await this.portfolioService.deleteProject(id)
        this.projects.splice(index, 1)
        this.alertService.toast('Proyecto eliminado')
        this.logger.log(this.idLog, 'deleteProject', { info: 'Success', response })
      }
    } catch (error: any) {
      const msg = error.error && error.error.message ? error.error.message : 'Problemas al eliminar proyecto, por favor intente mas tarde'
      this.alertService.alert(msg, 'error')
      this.logger.error(this.idLog, 'deleteProject', { info: 'Error', error })
    }
  }
}
