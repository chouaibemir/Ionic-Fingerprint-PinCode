import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { LottieAnimationViewModule } from 'ng-lottie';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { PinDialog } from '@ionic-native/pin-dialog/ngx';
//import { FingerprintPageModule } from  './fingerprint/fingerprint.module'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from '../app/components/components.module'
import { IonicStorageModule } from '@ionic/storage';
import { Vibration } from '@ionic-native/vibration/ngx';
import { SecureStorage   } from '@ionic-native/secure-storage/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import {EncrDecrService} from '../app/services/encr-decr.service';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, LottieAnimationViewModule.forRoot(),ComponentsModule,IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FingerprintAIO,
    PinDialog,
    Vibration,
    SecureStorage,
    Dialogs,
    EncrDecrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
