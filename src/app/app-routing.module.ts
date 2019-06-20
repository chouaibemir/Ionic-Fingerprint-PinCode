import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'pin', loadChildren: './pin/pin.module#PinPageModule' },
  { path: 'fingerprint', loadChildren: './fingerprint/fingerprint.module#FingerprintPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'pin-confirmation', loadChildren: './pin-confirmation/pin-confirmation.module#PinConfirmationPageModule' },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
