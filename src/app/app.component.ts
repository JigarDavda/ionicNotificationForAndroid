import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { ToastController } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private push: Push, public toastCtrl: ToastController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      //this.getPermission();
      this.pushSetup();
    });
  }

  // to check if we have permission
  //getPermission() {


  pushSetup() {
    this.push.hasPermission()
      .then((res: any) => {

        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
        } else {
          console.log('We do not have permission to send push notifications');
        }
      });
    const options: PushOptions = {
      android: {
        senderID: '112194018171'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      }
    };

    const pushObject: PushObject = this.push.init(options);


    pushObject.on('notification').subscribe((notification: any) => {
      console.log('Received a notification', notification)
      console.log('--------------->'+notification.additionalData.message)
      console.log('--------------->'+notification.title)
      console.log('--------------->'+notification.message)
      const toast=this.toastCtrl.create({
        message: notification.title +'\n' +notification.message,
        duration: 3000,
        position:'bottom'

      })
      toast.present();
    });

    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
    pushObject.on('emailGuests').subscribe(data => {
      console.log('I should email my guests');
    });
    pushObject.on('snooze').subscribe(data => {
      console.log('Remind me later');
    });
  }
}

