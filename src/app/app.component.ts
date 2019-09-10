import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';

import { Product } from './shared/interfaces';
import { AppState } from './core/store/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  countProductsInBusket: number = 0

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('busket')
      .pipe(untilDestroyed(this))
      .subscribe(prod => {
        const products: Product[] = prod.products
        let counter: number = 0
        products.filter(element => {
          if(element.inBucket){
            counter += 1
          }
        })
        this.countProductsInBusket = counter
      })
  }
  ngOnDestroy() { }
}
