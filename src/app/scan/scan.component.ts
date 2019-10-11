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
    this.scannerEnabled = false;
    this.lastQR = event;
    alert(this.lastQR);
  }

  startScan() {
    this.scannerEnabled = true;
  }

}
