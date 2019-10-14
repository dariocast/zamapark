import {Component, OnInit, ViewChild} from '@angular/core';
import {ZXingScannerComponent} from '@zxing/ngx-scanner';
import {QR} from '../qr';
import {AuthService} from '../auth.service';
import {QRType} from '../qrtype.enum';
import {async} from 'rxjs/internal/scheduler/async';
import {User} from '../user';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {
  @ViewChild('scanner', {static: false})
  scanner: ZXingScannerComponent;
  scannerEnabled = true;
  lastQR: QR;
  user: User;

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.auth.user$.toPromise().then(
      (val) => this.user = val
    );
  }

  scanSuccessHandler(event) {
    this.scannerEnabled = false;
    this.lastQR = JSON.parse(event);
    this.analizeQR();
  }

  private analizeQR() {
    alert(this.lastQR.type);
    if (this.lastQR.type === QRType.VALUE) {
      const factor = parseInt(this.lastQR.payload.price, 10);
      if (this.user) {
        const temp = this.user.balance - factor;
        if (temp >= 0) {
          this.user.balance = this.user.balance - factor;
          this.auth.updateUserData(this.user);
          alert('Hai acquistato ' + this.lastQR.payload.item + '\nNuovo credito: ' + this.user.balance);
        } else {
          alert('Credito insufficiente!');
        }
      }
    } else {
      console.error('QR scannerizzato: ' + this.lastQR);
      alert('Il codice QR non è valido!');
    }
  }

  startScan() {
    this.scannerEnabled = true;
  }

}
