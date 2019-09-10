import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';

import { DeleteAll } from './../core/store/basket.action';
import { Product } from './../shared/interfaces';
import { AppState } from './../core/store/app.state';
import { DeleteProduct } from '../core/store/basket.action';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit, OnDestroy {

  products: Product[] = []
  totalPrice: number = 0
  totalWeight: number = 0

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('busket')
      .pipe(untilDestroyed(this))
      .subscribe(products => {
        this.products = products.products
        this.products = this.products.filter((elem) => {
          return elem.inBucket
        })
        this.calculateTotal()
      })
  }

  ngOnDestroy() { }

  deleteProduct(product: Product) {
    this.store.dispatch(new DeleteProduct(product.id))
  }

  deleteAll(){
    this.store.dispatch(new DeleteAll())
  }

  calculateTotal() {
    this.totalPrice = 0
    this.totalWeight = 0
     
    this.products.forEach(product => {
      this.totalPrice += product.cost
      this.totalWeight += product.weight
    })
  }
}
