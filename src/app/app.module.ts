import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// the scanner!
import { ZXingScannerModule } from '@zxing/ngx-scanner';

// 2. Add your credentials from step 1
const config = {
  apiKey: 'AIzaSyDiDaKDcnES-RNeCl2Bpm2X-Z23BV_BZLU',
  authDomain: 'zama-394af.firebaseapp.com',
  databaseURL: 'https://zama-394af.firebaseio.com',
  projectId: 'zama-394af',
  storageBucket: '',
  messagingSenderId: '137176659596',
  appId: '1:137176659596:web:d45cb747ef76980deaeda9',
  measurementId: 'G-ZQEJ929G9W'
};

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { WalletComponent } from './wallet/wallet.component';
import { ScanComponent } from './scan/scan.component';
import { AuthService } from './auth.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth.guard';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    NgbModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: UserProfileComponent},
      { path: 'login', component: UserProfileComponent},
      { path: 'menu', component: ProductListComponent},
      { path: 'wallet', component: WalletComponent,  canActivate: [AuthGuard]},
      { path: 'scan', component: ScanComponent,  canActivate: [AuthGuard]},
    ]),
    ZXingScannerModule,
    // 3. Initialize
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }) // storage
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    WalletComponent,
    ScanComponent,
    UserProfileComponent,
  ],
  bootstrap: [ AppComponent ],
  providers: [AuthService, AuthGuard]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
