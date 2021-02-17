import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { CreateOrder, OrderWs } from "src/app/models";
import * as signalR from '@aspnet/signalr';
import { Observable } from "rxjs";
import { switchMap, tap } from "rxjs/operators";

@Injectable()
export class WsStore extends ComponentStore<{ orders: OrderWs[] }> {

  private hubConnection: signalR.HubConnection;

  constructor() {
    super({ orders: [] });

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:1337/shoppinghub')
      .build();

    this.hubConnection.start()
      .then(() => console.log('Started the Hub Connection!'))
      .catch(err => console.log(err));

    this.hubConnection.on('OrderPlaced', (order) => {
      this.addOrder(order);
    });

    this.hubConnection.on('OrderProcessed', (order) => {
      this.updateOrder(order);
    });

    this.hubConnection.on('ItemProcessed', (status) => {
      this.updateMessage(status);
    })
  }
  private readonly updateOrder = this.updater((state, order: OrderWs) => {
    var storedOrders = [...state.orders];
    storedOrders.find(o => o.id === order.id).pickupTimeAssigned = order.pickupTimeAssigned;
    return {
      orders: [...storedOrders]
    }
  });

  private readonly updateMessage = this.updater((state, status: { id: string, message: string }) => {
    const storedOrders = [...state.orders];
    storedOrders.find(o => o.id == status.id).message = status.message;
    return {
      orders: [...storedOrders]
    }
  });

  private readonly addOrder = this.updater((state, order: OrderWs) => {
    return {
      orders: [order, ...state.orders]
    }
  })

  readonly createOrder = this.effect((order$: Observable<CreateOrder>) => {
    return order$.pipe(
      tap(order => this.hubConnection.send('PlaceOrder', order)),
      tap(order => console.log('Got an order', order))
    )
  });
}
