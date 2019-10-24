import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(public auth: AuthService, private snackBar: MatSnackBar ) { }

  ngOnInit() {
    const msg = localStorage.getItem('msg' );
    if (msg != null) {
      this.openSnackBar(msg, 'Ok');
      localStorage.removeItem('msg');
    }

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

}
