import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { untilDestroyed } from 'ngx-take-until-destroy';

import { AppState } from './../core/store/app.state';
import { Product } from './../shared/interfaces';
import { AddProduct } from '../core/store/basket.action';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy {

  products: Product[] = []

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('busket')
      .pipe(untilDestroyed(this))
      .subscribe(prod => {
        this.products = prod.products
      })
  }

  ngOnDestroy(){}

  addProduct(product: Product) {
    if (product.inBucket) {
      return
    }
    this.store.dispatch(new AddProduct(product.id))
  }
}
