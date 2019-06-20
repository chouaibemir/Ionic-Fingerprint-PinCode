import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NavController, ModalController, AlertController   } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { PinDialog } from '@ionic-native/pin-dialog/ngx';
import { Storage } from '@ionic/storage';
import { Vibration } from '@ionic-native/vibration/ngx';
import { NavigationEnd, Router } from '@angular/router';
import { FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio/ngx';
import {EncrDecrService} from '../services/encr-decr.service';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.page.html',
  styleUrls: ['./pin.page.scss'],
})
export class PinPage implements OnInit {
  @Input() pagetitle: String = "Enter your pin code";

  pin:string= "";
  pinCodeFromStorage:string="";
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  fingerprintOptions : FingerprintOptions

  constructor(private EncrDecr: EncrDecrService,private router: Router,private storage: Storage, public alertController: AlertController, private vibration :Vibration,private fingerprint: FingerprintAIO,private platform: Platform) {
    
    this.fingerprintOptions = {
      clientId: 'Fingerprint-Demo',
      clientSecret: 'password',
      disableBackup : true
    }
   
  }

  async showFingerprintDialog() {
    //console.log("finger");

    try {
      await this.platform.ready();
      const available = await this.fingerprint.isAvailable();
      
        //console.log(available+"avv");
        if(available==="finger")
        {
          const result = await this.fingerprint.show(this.fingerprintOptions);
          //console.log(result+"yyyy");
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
  ionViewWillEnter()
  {
    this.getFromStorage();
    console.log("pincodefromstorage = ", this.pinCodeFromStorage)
  }
  emitEvent() {
    this.change.emit(this.pin);
  }

  handleInput(pin: string) {
    if (pin === "clear") {
      this.pin = "";
      return;
    }

    if (this.pin.length === 4) {
      return;
    }
    this.vibrateWhenTyping();
    this.pin += pin;
    
  }
  ngOnInit() {
    
  }
  

  okAction()
  {
   if(this.pinCodeFromStorage)
    {
      if(this.pin.length === 4 && this.pin == this.pinCodeFromStorage)
        {
          this.NavigateToHome();
          this.pin = "";  
        }
      else if(this.pin.length < 4 || this.pin != this.pinCodeFromStorage)  
        {
          this.vibrate();
        }
    }
    
    else if(!this.pinCodeFromStorage)
    {
      if(this.pin.length === 4)
      {
        this.NavigateToConfirmation(this.pin);
        this.pin = "";
      }
      else 
      {
        this.vibrate();
      }
      
    }
    this.vibrateWhenTyping();
  }
  vibrate()
  {
    this.vibration.vibrate(200);
    //console.log("vibrate");
  }
  vibrateWhenTyping()
  {
    this.vibration.vibrate(50);
    //console.log("vibrate");
  }
  

  async getFromStorage()
  {
    this.storage.get('pinCode').then((val) => {
      //console.log('Your pin code is', val);
      var decryptedPwd = this.decryptCodePin(val);
      this.pinCodeFromStorage = decryptedPwd;
    });
  }
  
  async removeFromStorage()
  {
    this.storage.remove('pinCode');
  }
  
  async NavigateToConfirmation(paramFirstPinCode){
    //console.log("navigatetoconfirmation");
    this.router.navigate(['/pin-confirmation', { firstPinCode : paramFirstPinCode }]);
  }

  async NavigateToHome(){
    this.router.navigate(['/login']);
  }
  async NavigateToLogin(){
    this.router.navigate(['/home'])
  }
  encryptCodePin(codePin)
  {
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', codePin);
    //console.log('Encrypted :' + encrypted);
    return encrypted;
  }
  decryptCodePin(encrypted)
  {
    var decrypted = this.EncrDecr.get('123456$#@$^@1ERF', encrypted);
    return decrypted;
  }
}
