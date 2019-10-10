import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  balance;

  constructor() {
    if (localStorage.getItem('balance') == null) {
      this.balance = 50;
      localStorage.setItem('balance', '50');
    } else {
      this.balance = parseInt(localStorage.getItem('balance'));
    }
  }

  ngOnInit() {}
}
