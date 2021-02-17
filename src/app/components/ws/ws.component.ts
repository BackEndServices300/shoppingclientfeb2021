import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { OrderWs } from 'src/app/models';
import { WsStore } from './wsstore';

@Component({
  selector: 'app-ws',
  templateUrl: './ws.component.html',
  styleUrls: ['./ws.component.css']
})
export class WsComponent implements OnInit {

  orders$: Observable<OrderWs[]>;
  form: FormGroup = this.formBuilder.group({
    pickupPerson: ['', [Validators.required]],
    items: ['', [Validators.required]]
  })
  constructor(private store: WsStore, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.orders$ = this.store.select(s => s.orders);
  }

  submit() {
    this.store.createOrder(this.form.value);
    this.form.reset();
  }
}
