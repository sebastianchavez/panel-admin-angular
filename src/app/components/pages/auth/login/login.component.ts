import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoggerService } from '../../../../services/logger/logger.service';
import { UserService } from '../../../../services/user/user.service';
import { AlertService } from '../../../../services/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  idLog: string = 'LoginComponent'
  loginForm: FormGroup = new FormGroup({});
  submitted = false;
  btnLoad: Boolean = false;

  constructor(
    private router: Router,
    private logger: LoggerService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) { }

  get f() { return this.loginForm.controls; }

  ngOnInit(): void {
    this.clearForm()
  }

  async login(values: any) {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.btnLoad = true
    try {
      const response = await this.userService.login(values)
      this.alertService.toast('Usuario autenticado')
      localStorage.setItem('isAuth', 'true')
      localStorage.setItem('currentUser', JSON.stringify(response.user))
      localStorage.setItem('accessToken', response.user.accessToken)
      this.router.navigateByUrl('/')
      this.logger.log(this.idLog, 'login', { info: 'Success', response })
    } catch (error: any) {
      const msg = error.message ? error.message : 'Problemas en autenticación, por favor intente más tarde'
      this.alertService.alert(msg, 'error')
      this.logger.error(this.idLog, 'login', { info: 'Error', error })
    }
    this.btnLoad = false
  }

  clearForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

}
