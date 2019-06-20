import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Vibration } from '@ionic-native/vibration/ngx';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import {EncrDecrService} from '../services/encr-decr.service';

@Component({
  selector: 'app-pin-confirmation',
  templateUrl: './pin-confirmation.page.html',
  styleUrls: ['./pin-confirmation.page.scss'],
})
export class PinConfirmationPage implements OnInit {
  @Input() pagetitle: String = "Confirm your pin code";
  public pinFromPrevious: any;

  pin:string= "";
  pinCodeFromStorage:string="";
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  constructor(private EncrDecr: EncrDecrService,private activatedRoute: ActivatedRoute,private router: Router,private storage: Storage,private vibration :Vibration) 
    {
      this.pinFromPrevious = this.activatedRoute.snapshot.params.firstPinCode;
     // console.log(this.pinFromPrevious);
    }

  ngOnInit() {
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
    this.pin += pin;
  }

  okAction()
  {
    if(this.pin.length === 4 && this.pin == this.pinFromPrevious)
        {
          this.addInStorage(this.pin);
          this.NavigateToHome();  
          this.pin = "";
        }
    else 
    {
      this.vibrate();
    }
  }

  async addInStorage(pinCode: string)
  {
    var encryptedPwd = this.encryptCodePin(pinCode);
    this.storage.set('pinCode', encryptedPwd);
   // console.log("encryptedPwd= ",encryptedPwd)
    //this.getFromStorage();
  }

  async getFromStorage()
  {
    this.storage.get('pinCode').then((val) => {
     // console.log('Your pin code is', val);
      var decryptedPwd = this.decryptCodePin(val);
      this.pinCodeFromStorage = decryptedPwd;
    });
  }

  async NavigateToHome(){
    this.router.navigate(['/login']);
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
