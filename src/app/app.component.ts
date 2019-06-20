import { Component, ViewChildren, QueryList } from '@angular/core';

import { Platform, IonRouterOutlet, ActionSheetController, PopoverController, ModalController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HomePage } from './home/home.page';
import { LoginPage } from './login/login.page';
import { Router } from '@angular/router';
import { PinPage } from './pin/pin.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  rootPage:any = PinPage;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router : Router,
    private actionSheetCtrl: ActionSheetController,
    private popoverCtrl: PopoverController,
    public modalCtrl: ModalController,
    private menu: MenuController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.router.navigateByUrl('pin');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.platform.pause.subscribe(() => {
        console.log('[INFO] App paused');
    });

    this.platform.resume.subscribe(() => {
        console.log('[INFO] App resumed');
      this.router.navigateByUrl('pin');

    });
    });
  }

 

}
