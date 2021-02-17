import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { CreateOrder, Order } from "src/app/models";

@Injectable()
export class AsyncStore extends ComponentStore<{ orders: Order[] }> {

  constructor(private http: HttpClient) {
    super({ orders: [] })
  }


  readonly refreshOrder = this.effect((id$: Observable<string>) => {
    return id$.pipe(
      switchMap(id => this.http.get<Order>('http://localhost:1337/curbsideorders/' + id).pipe(
        tapResponse(
          o => this.updateOrder(o),
          e => console.log(e)
        )
      ))
    )
  });

  readonly placeOrder = this.effect((order$: Observable<CreateOrder>) => {
    return order$.pipe(
      switchMap(order => this.http.post<Order>('http://localhost:1337/curbsideorders', order).pipe(
        tapResponse(
          o => this.addOrder(o),
          e => console.log(e)
        )
      ))
    )
  })

  private readonly addOrder = this.updater((state, order: Order) => {
    const newState = { ...state, orders: [order, ...state.orders] };
    return newState;
  })

  private readonly updateOrder = this.updater((state, order: Order) => {
    const orders = [...state.orders];
    orders.filter(o => o.id === order.id)[0].pickupTimeAssigned = order.pickupTimeAssigned;
    return { ...state, orders: orders }
  })
}
