import { Component, OnInit } from '@angular/core';
import { LottieAnimationViewModule } from 'ng-lottie';
import { FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio/ngx';
import { NavigationEnd, Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-fingerprint',
  templateUrl: './fingerprint.page.html',
  styleUrls: ['./fingerprint.page.scss'],
})
export class FingerprintPage {
  fingerprintOptions : FingerprintOptions
  constructor(private router: Router,private fingerprint: FingerprintAIO,private platform: Platform)
  {
    this.fingerprintOptions = {
      clientId: 'Fingerprint-Demo',
      clientSecret: 'password',
      disableBackup : true
    }
    this.showFingerprintDialog();
  }
  
  async showFingerprintDialog() {
    console.log("finger");

    try {
      await this.platform.ready();
      const available = await this.fingerprint.isAvailable();
      
        console.log(available+"avv");
        if(available==="finger")
        {
          const result = await this.fingerprint.show(this.fingerprintOptions);
          console.log(result+"yyyy");
          this.NavigateToHome();

        }
        else if(available !="finger")
        {
          this.NavigateToLogin();
        }
    }
    catch (e) {
      console.error(e);
    }
  }
async NavigateToHome(){
  this.router.navigate(['/login'])
}
async NavigateToLogin(){
  this.router.navigate(['/home'])
}
}
