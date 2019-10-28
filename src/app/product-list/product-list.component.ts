import {Component, OnInit} from '@angular/core';

import { products } from '../products';
import {MenuService} from '../menu.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products = products;
  detail(product) {
    window.alert(product.name + ' costa ' + product.price + ' crediti');
  }

  constructor(private menu: MenuService) {}

  ngOnInit() {
    this.menu
      .getMenu()
      .subscribe(
        data => {
          this.products = data.menu;
        },
        err => {
          console.log(err);
        }
      );
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
