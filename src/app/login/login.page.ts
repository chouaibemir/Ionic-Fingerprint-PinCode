import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage/ngx';
import { NavController, ModalController, AlertController, Platform   } from '@ionic/angular';
import { Dialogs } from '@ionic-native/dialogs/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy, AfterViewInit {
  backButtonSubscription;
  codePinFromStorage : string;
  secureIV: string;
  private secure: SecureStorageObject;
  constructor(private platform: Platform,private dialogs:Dialogs,private secureStorage: SecureStorage,private storage: Storage) {
    this.getFromStorage();
    //this.generateEncryption();
    //this.getDecryption();
    //this.add();
    //this.get(); 
   // this.createSecureStorage();
   }

  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
      //navigator['app'].

    });
   }


  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
   }


  ngOnInit() {
  }
  async getFromStorage()
  {
    this.storage.get('pinCode').then((val) => {
      console.log('Your pin code is login=', val);
      this.codePinFromStorage = val;
    });
  }
 /* async add()
  {
    this.secureStorage.create('user_infos')
    .then((storage: SecureStorageObject) => {

      storage.set('pin', '1234')
       .then(
        data => console.log("add",data),
         error => console.log(error)
     );
    });
  }

  async get()
  {
    this.secureStorage.create('user_infos')
    .then((storage: SecureStorageObject) => {

      storage.get('pin')
       .then(
         data => console.log("get",data),
         error => console.log(error)
     );

    });
  }
  */
  /*private createSecureStorage() {
    this.secureStorage.create("user_infos").then( 
        (storage: SecureStorageObject) => {
            console.log("secure");
            this.secure = storage;
    }).catch( 
        (secureDeviceObject) => {
            this.dialogs.alert( 'Please enable the screen lock on your device. This app cannot operate securely without it.').then( 
                () => {
                    // Alert Dismissed, should open the secure lockscreen settings here
                    secureDeviceObject.secureDevice().then( 
                    () => {
                        // Try again
                        console.log("Success");
                        this.createSecureStorage();
                    } ).catch( () => { 
                        // Try again
                        console.log(" Error ")
                        this.createSecureStorage();
                    })
                } ); 
        } );
}*/
}
