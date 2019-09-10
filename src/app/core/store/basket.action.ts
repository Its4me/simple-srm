import { Action } from '@ngrx/store';

export namespace BUSKET_ACTION {
  export const ADD_PRODUCT = 'ADD_PRODUCT'
  export const DELETE_PRODUCT = 'DELETE_PRODUCT'
  export const DELETE_ALL = 'DELETE_ALL'
}

export class AddProduct implements Action {
  readonly type = BUSKET_ACTION.ADD_PRODUCT

  constructor(public payload: number) { }
}

export class DeleteProduct implements Action {
  readonly type = BUSKET_ACTION.DELETE_PRODUCT

  constructor(public payload: number) { }
}

export class DeleteAll implements Action {
  readonly type = BUSKET_ACTION.DELETE_ALL

  constructor(public payload = null) { }
}
export type BusketUnion = DeleteAll | AddProduct | DeleteProduct