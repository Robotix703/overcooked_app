/* eslint-disable object-shorthand */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() { }

  authenticate(apiKey: string) {
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Test...' })
      .then(loadingEl => {
        loadingEl.present();
        this.authService.login(apiKey)
          .subscribe((result: Boolean) => {
            this.authService.saveAPIKey(apiKey)
              .then((result: any) => {
                this.isLoading = false;
                loadingEl.dismiss();
                this.router.navigateByUrl('/home');
              })
              .catch((error: any) => {
                console.error(error);
                this.alertCtrl
                  .create({
                    header: 'Authentication failed',
                    message: error,
                    buttons: ['Okay']
                  })
                  .then(alertEl => alertEl.present());
              });
          },
            (error: any) => {
              loadingEl.dismiss();
              console.error(error);
              this.alertCtrl
                .create({
                  header: 'Authentication failed',
                  message: error.error.message,
                  buttons: ['Okay']
                })
                .then(alertEl => alertEl.present());
            });
      });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const apiKey: string = form.value.apiKey;

    this.authenticate(apiKey);
    form.reset();
  }
}
