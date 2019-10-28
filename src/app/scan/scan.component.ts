import {Component, OnInit, ViewChild} from '@angular/core';
import {ZXingScannerComponent} from '@zxing/ngx-scanner';
import {QR} from '../qr';
import {AuthService} from '../auth.service';
import {QRType} from '../qrtype.enum';
import {User} from '../user';
import {auth} from 'firebase';
import {Router} from '@angular/router';


@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {
  @ViewChild('scanner', {static: false})
  scanner: ZXingScannerComponent;
  scannerEnabled = false;
  lastQR: QR;
  user: User;

  constructor(public authService: AuthService, private router: Router) {
    this.authService.user$.subscribe(
      (user) => {
        if (user) {
          this.user = user;
        }
      }
    );
  }

  ngOnInit() {
    if ( this.scanner.askForPermission() ) {
      this.scannerEnabled = true;
    }
  }
  scanSuccessHandler(event) {
    this.scannerEnabled = false;
    this.lastQR = JSON.parse(event);
    this.analizeQR();
    this.router.navigateByUrl('');
  }

  private analizeQR() {
    if (this.lastQR.type.toString() === QRType[QRType.VALUE]) {
      const factor = parseInt(this.lastQR.payload.price, 10);
      if (this.user !== undefined) {
        const temp = this.user.balance - factor;
        console.log('balance: ' + this.user.balance + '\nfactor: ' + factor + '\ntemp: ' + temp);
        if (temp >= 0) {
          this.user.balance = this.user.balance - factor;
          this.authService.updateUserData(this.user);
          localStorage.setItem('msg', 'Hai acquistato ' + this.lastQR.payload.item + '\nNuovo credito: ' + this.user.balance);
        } else {
          localStorage.setItem('msg', 'Credito insufficiente!');
        }
      }
    } else {
      console.error('QR scannerizzato: ' + this.lastQR);
      localStorage.setItem('msg', 'Il codice QR non è valido!');
    }
  }

  startScan() {
    this.scannerEnabled = true;
  }

}
