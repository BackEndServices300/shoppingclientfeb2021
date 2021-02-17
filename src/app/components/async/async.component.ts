import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models';
import { AsyncStore } from './asyncstore';

@Component({
  selector: 'app-async',
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.css']
})
export class AsyncComponent implements OnInit {

  orders$: Observable<Order[]>;
  form: FormGroup = this.formBuilder.group({
    pickupPerson: ['', [Validators.required]],
    items: ['', [Validators.required]]
  })
  constructor(private store: AsyncStore, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.orders$ = this.store.select(s => s.orders);
  }

  submit() {
    this.store.placeOrder(this.form.value);
    this.form.reset();
  }
  refresh(id: string) {
    this.store.refreshOrder(id);
  }
}
