import { Component, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import {QR} from '../qr';

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

  constructor() { }

  ngOnInit() {
  }

  scanSuccessHandler(event) {
    this.lastQR = event;
    alert(event);
    alert(this.lastQR);
    this.scannerEnabled = false;
  }

  startScan() {
    this.scannerEnabled = true;
  }

}
